import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { Progress } from "../../database/associations";
import { GetProgressDTO, SetCaloriePlanDTO, UpsertProgressDTO } from "./types";

export default class ProgressService {
  public upsert = async (params: UpsertProgressDTO) => {
    const { data, transaction } = params;
    const lastWeightUpdateDate = data.lastWeightUpdateAt
      ? new Date(data.lastWeightUpdateAt)
      : undefined;

    try {
      const [updatedProgress] = await Progress.upsert(
        {
          ...data,
          updatedAt: new Date(),
          lastWeightUpdateAt: lastWeightUpdateDate,
        },
        { transaction: transaction, returning: true }
      );

      return (updatedProgress as Progress).toJSON();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na atualização das informações de progresso do usuário com id: '${data.userId}'.`,
        ProgressService.name,
        error.message
      );
    }
  };

  public get = async (params: GetProgressDTO) => {
    const { userId, transaction } = params;
    try {
      const userProgress = await Progress.findOne({
        where: { userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        lock: transaction?.LOCK.UPDATE,
        transaction,
      });

      if (!userProgress) {
        return null;
      }
      return userProgress.toJSON();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro ao buscar as informações de progresso do usuário com id: '${userId}'.`,
        ProgressService.name,
        error.message
      );
    }
  };

  public setCaloriePlan = async (params: SetCaloriePlanDTO) => {
    const { userId, caloriePlan } = params.data;

    try {
      const [updatedCount, updatedProgress] = await Progress.update(
        { currentCaloriePlan: caloriePlan, updatedAt: new Date() },
        { where: { userId }, returning: true, transaction: params.transaction }
      );

      if (updatedCount === 0) {
        return null;
      }

      return (updatedProgress[0] as Progress).toJSON();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na seleção do plano de calorias para o usuário com id: '${userId}'.`,
        ProgressService.name,
        error.message
      );
    }
  };
}
