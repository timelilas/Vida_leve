import { Transaction } from "sequelize";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import PlanHistory from "../../database/models/PlanHistory";
import { PlanHistoryDTO } from "./types";

export default class PlanHistoryService {
  public getById = async (id: number) => {
    try {
      const planHistory = await PlanHistory.findAll({
        where: { userId: id },
        attributes: { exclude: ["userId"] },
      });

      return planHistory?.map((plan) => plan.toJSON());
    } catch (error) {
      console.log(error);
      const message = `Ocorreu um erro durante a busca do histórico de plano com id: '${id}'`;
      throw new Error(message);
    }
  };

  public getByDate = async (id: number, date: string) => {
    try {
      const planHistory = await PlanHistory.findOne({
        where: { userId: id, date },
        attributes: { exclude: ["userId"] },
      });

      return planHistory?.toJSON();
    } catch (error) {
      console.log(error);
      const message = `Ocorreu um erro durante a busca do histórico de plano com id: '${id}'`;
      throw new Error(message);
    }
  };

  public post = async (planHistory: PlanHistoryDTO) => {
    try {
      const date = planHistory.date.toISOString().split("T")[0];
      const createdPlanHistory = await PlanHistory.create(
        { ...planHistory, date },
        {}
      );

      const newData = {
        dailyCalorieIntake: createdPlanHistory.dailyCalorieIntake,
        planType: createdPlanHistory.planType,
        date: createdPlanHistory.date,
      };
      return newData;
    } catch (error) {
      console.log(error);
      const message = `Ocorreu um erro durante a criação do histórico de plano.`;
      throw new Error(message);
    }
  };

  public put = async (planHistory: PlanHistoryDTO) => {
    const exist = await PlanHistory.findOne({
      where: { userId: planHistory.userId, date: planHistory.date },
    });

    if (!exist) {
      throw new Error(
        `Histórico de plano com id: '${planHistory.userId}' não encontrado.`
      );
    }
    try {
      const date = planHistory.date.toISOString().split("T")[0];
      const updatedPlanHistory = await PlanHistory.update(
        { ...planHistory, date },
        {
          where: { userId: planHistory.userId, date: planHistory.date },
          returning: true,
        }
      );

      const newData = {
        dailyCalorieIntake: updatedPlanHistory[1][0].dailyCalorieIntake,
        planType: updatedPlanHistory[1][0].planType,
        date: updatedPlanHistory[1][0].date,
      };

      return newData;
    } catch (error) {
      console.log(error);
      const message = `Ocorreu um erro durante a atualização do histórico de plano com id: '${planHistory.userId}'`;
      throw new Error(message);
    }
  };

  public upsert = async (
    planHistory: PlanHistoryDTO,
    transaction?: Transaction
  ) => {
    try {
      await PlanHistory.upsert(
        {
          userId: planHistory.userId,
          planType: planHistory.planType,
          strategy: planHistory.strategy,
          dailyCalorieIntake: planHistory.dailyCalorieIntake,
          date: planHistory.date.toISOString().split("T")[0],
        },
        { transaction }
      );
    } catch (error: any) {
      throw new DatabaseException(
        `Ocorreu um erro durante a atualização do histórico de planos.`,
        PlanHistoryService.name,
        error.message
      );
    }
  };
}
