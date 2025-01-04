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

export default class ProgressController {
  private _CaloriePlanService = new CaloriePlanService();
  private _ProgressService = new ProgressService();
  private _UserService = new UserService();

  async upsert(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { height, weight, goalWeight, activityFrequency } = req.body;

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

    const transaction = await sequelize.transaction();

    try {
      const bmrParams = { weight, height, gender, age };
      const newCaloriePlans = allowedPlans.map((type) => {
        return ProgressHelper.createCaloriePlan({
          ...bmrParams,
          type,
          goalWeight,
          activityFrequency,
        });
      });

      const createdProgress = await this._ProgressService.upsert({
        data: { ...req.body, userId },
        transaction,
      });

      await this._CaloriePlanService.upsertPlans({
        data: { userId, plans: newCaloriePlans },
        transaction,
      });

      await transaction.commit();
      return res.status(200).json({ data: createdProgress });
    } catch (error: any) {
      await transaction.rollback();
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
      const userProgress = await this._ProgressService.get(userId);

      if (!userProgress) {
        throw new NotFoundException(
          "Este usuário não possui um progresso cadastrado.",
          ProgressController.name
        );
      }
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

    try {
      const updatedProgress = await this._ProgressService.setCaloriePlan({
        userId,
        caloriePlan: currentCaloriePlan,
      });

      if (!updatedProgress) {
        throw new NotFoundException(
          "Este usuário não possui um progresso cadastrado.",
          ProgressController.name
        );
      }

      return res.status(200).json({ data: updatedProgress });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao atualizar o plano de execução.",
      });
    }
  }
}
