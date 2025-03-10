import { Transaction } from "sequelize";
import { sequelize } from "../../database";
import { CaloriePlan } from "../../database/associations";
import { UpsertPlansDTO } from "./types";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";

export class CaloriePlanService {
  public async getAll(userId: number) {
    try {
      const plans = await CaloriePlan.findAll({
        where: { userId },
        attributes: { exclude: ["createAt", "updatedAt"] },
      });

      return plans.map((plan) => plan.toJSON());
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na busca dos planos de calorias para o usuário com id: ${userId}.`,
        CaloriePlanService.name,
        error.message
      );
    }
  }

  public async upsertPlans(params: UpsertPlansDTO) {
    const { transaction, data } = params;
    const { userId, plans } = data;

    const upsertQueries = plans.map((plan) => ({
      run: async (transaction: Transaction) => {
        const queryParams = { ...plan, userId, updatedAt: new Date() };
        await CaloriePlan.upsert(queryParams, { transaction });
      },
    }));

    try {
      if (transaction) {
        await Promise.all(upsertQueries.map((query) => query.run(transaction)));
        return;
      }

      const localTransaction = await sequelize.transaction();

      try {
        await Promise.all(
          upsertQueries.map((query) => query.run(localTransaction))
        );
        await localTransaction.commit();
      } catch (error) {
        await localTransaction.rollback();
        throw error;
      }
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na tentativa de atualizar os planos de caloria do usuário com id: ${userId}.`,
        CaloriePlanService.name,
        error.message
      );
    }
  }
}
