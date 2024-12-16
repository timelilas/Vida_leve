import { Transaction } from "sequelize";
import { sequelize } from "../../database";
import CaloriePlan from "../../database/models/CaloriePlan";
import { UpsertPlansDTO } from "./types";

export class CaloriePlanService {
  public async getAll(userId: number) {
    const plans = await CaloriePlan.findAll({
      where: { userId },
      attributes: { exclude: ["createAt", "updatedAt"] },
    });

    return plans.map((plan) => plan.toJSON());
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
  }
}
