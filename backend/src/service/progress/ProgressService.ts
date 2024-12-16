import Progress from "../../database/models/Progress";
import { SetCaloriePlanDTO, UpsertProgressDTO } from "./types";

export default class ProgressService {
  public upsert = async (params: UpsertProgressDTO) => {
    const { data, transaction } = params;
    data.currentCaloriePlan;

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
  };

  public get = async (userId: number) => {
    const userProgress = await Progress.findOne({
      where: { userId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userProgress) {
      return null;
    }
    return userProgress.toJSON();
  };

  public setCaloriePlan = async (params: SetCaloriePlanDTO) => {
    const { userId, caloriePlan } = params;
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
  };
}
