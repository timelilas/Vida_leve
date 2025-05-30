import { Request, Response } from "express";
import ProgressService from "../../service/progress/ProgressService";
import UserService from "../../service/user/UserService";
import { ProgressHelper } from "../../@core/entity/progress/helpers";
import { UserHelper } from "../../@core/entity/user/helpers";
import { allowedPlans } from "../../@core/entity/@shared";
import { sequelize } from "../../database";
import { CaloriePlanService } from "../../service/caloriePlan/CaloriePlanService";
import { BadRequestException } from "../../@core/exception/http/BadRequestException";
import { NotFoundException } from "../../@core/exception/http/NotFoundException";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import PlanHistoryService from "../../service/planHistory/PlanHistoryService";
import { getDateFromTimezone } from "../../utils/common/helpers";
import WeightHistoryService from "../../service/weightHistory/WeightHistoryService";

export default class ProgressController {
  private _WeightHistoryService = new WeightHistoryService();
  private _CaloriePlanService = new CaloriePlanService();
  private _PlanHistoryService = new PlanHistoryService();
  private _ProgressService = new ProgressService();
  private _UserService = new UserService();

  async upsert(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { height, weight, goalWeight, activityFrequency } = req.body;
    const userTimezone = (req.headers["x-timezone"] || "UTC") as string;

    let transaction = null;

    try {
      const userProfile = await this._UserService.get(userId);

      if (!userProfile?.birthDate) {
        throw new BadRequestException(
          "É necessário ter uma data de nascimento cadastrada para continuar.",
          ProgressController.name
        );
      }

      if (!userProfile.gender) {
        throw new BadRequestException(
          "É necessário ter um gênero cadastrado para continuar.",
          ProgressController.name
        );
      }

      const { birthDate, gender } = userProfile;
      const age = UserHelper.calculateAge(birthDate);
      const { min, max } = ProgressHelper.calculateHealthyWeightRange(
        age,
        height
      );

      if (goalWeight < min || goalWeight > max) {
        throw new BadRequestException(
          `O peso desejado informado está fora dos limites saudáveis. Mínimo de ${min}kg e máximo de ${max}kg.`,
          ProgressController.name,
          "goalWeight"
        );
      }

      transaction = await sequelize.transaction();

      const bmrParams = { weight, height, gender, age };
      const newCaloriePlans = allowedPlans.map((type) => {
        return ProgressHelper.createCaloriePlan({
          ...bmrParams,
          type,
          goalWeight,
          activityFrequency,
        });
      });

      const foundPlan = newCaloriePlans.find(
        ({ type }) => type === req.body.currentCaloriePlan
      );

      const oldProgressData = await this._ProgressService.get({
        userId,
        transaction,
      });

      const hasWeightChanged = oldProgressData?.weight !== weight;

      const createdProgress = await this._ProgressService.upsert({
        data: {
          ...req.body,
          userId,
          lastWeightUpdateAt: hasWeightChanged ? new Date() : undefined,
        },
        transaction,
      });

      await this._CaloriePlanService.upsertPlans({
        data: { userId, plans: newCaloriePlans },
        transaction,
      });

      if (oldProgressData && hasWeightChanged) {
        await this._WeightHistoryService.deleteAll({ userId, transaction });
      }

      if (foundPlan) {
        await this._PlanHistoryService.upsert(
          {
            date: getDateFromTimezone(userTimezone),
            planType: foundPlan.type,
            strategy: goalWeight < weight ? "deficit" : "superavit",
            dailyCalorieIntake: foundPlan.dailyCalorieIntake!,
            userId: userId,
          },
          transaction
        );
      }

      await transaction.commit();
      return res.status(200).json({ data: createdProgress });
    } catch (error: any) {
      await transaction?.rollback();
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro durante a criação do progresso.",
      });
    }
  }

  async getProgress(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    try {
      const userProgress = await this._ProgressService.get({ userId });

      return res.status(200).json({ data: userProgress });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro na busca das informações de progresso.",
      });
    }
  }

  async setCaloriePlan(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { currentCaloriePlan } = req.body;
    const userTimezone = (req.headers["x-timezone"] || "UTC") as string;

    let transaction = null;

    try {
      transaction = await sequelize.transaction();

      const currentPlan = await this._CaloriePlanService.getByType({
        userId,
        type: currentCaloriePlan,
      });

      const updatedProgress = await this._ProgressService.setCaloriePlan({
        data: { userId, caloriePlan: currentCaloriePlan },
        transaction,
      });

      if (!updatedProgress || !currentPlan) {
        await transaction.rollback();
        throw new NotFoundException(
          "Este usuário não possui um progresso cadastrado.",
          ProgressController.name
        );
      }
      const { weight, goalWeight } = updatedProgress;

      await this._PlanHistoryService.upsert(
        {
          date: getDateFromTimezone(userTimezone),
          planType: currentCaloriePlan,
          strategy: goalWeight < weight ? "deficit" : "superavit",
          dailyCalorieIntake: currentPlan.dailyCalorieIntake,
          userId: userId,
        },
        transaction
      );

      await transaction.commit();

      return res.status(200).json({ data: updatedProgress });
    } catch (error: any) {
      await transaction?.rollback();
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao atualizar o plano de execução.",
      });
    }
  }
}
