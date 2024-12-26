import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import Progress from "../../database/models/Progress";
import { SetCaloriePlanDTO, UpsertProgressDTO } from "./types";

export default class ProgressService {
  public upsert = async (params: UpsertProgressDTO) => {
    const { data, transaction } = params;
    try {
      await Progress.upsert(
        { ...data, updatedAt: new Date() },
        { transaction: params.transaction }
      );

      const updatedProgress = await Progress.findOne({
        where: { userId: data.userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        transaction,
      });
      return (updatedProgress as Progress).toJSON();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na atualização das informações de progresso do usuário com id: ${data.userId}`,
        ProgressService.name,
        error.message
      );
    }
  };

  public get = async (userId: number) => {
    try {
      const userProgress = await Progress.findOne({
        where: { userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!userProgress) {
        return null;
      }
      return userProgress.toJSON();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro ao buscar as informações de progresso do usuário com id: ${userId}`,
        ProgressService.name,
        error.message
      );
    }
  };

  public setCaloriePlan = async (params: SetCaloriePlanDTO) => {
    const { userId, caloriePlan } = params;

    try {
      const [updatedCount] = await Progress.update(
        { currentCaloriePlan: caloriePlan, updatedAt: new Date() },
        { where: { userId } }
      );

      if (updatedCount === 0) {
        return null;
      }

      const updatedProgress = await Progress.findOne({
        where: { userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      return (updatedProgress as Progress).toJSON();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na seleção do plano de calorias para o usuário com id: ${userId}`,
        ProgressService.name,
        error.message
      );
    }
  };
}
