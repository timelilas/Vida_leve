import Progress from "../../database/models/Progress";
import { UpsertProgressDTO } from "./types";

export default class ProgressService {
  public upsert = async (params: UpsertProgressDTO) => {
    const { userId, weight, height, goalWeight, activityFrequency } = params;

    await Progress.upsert(
      {
        userId,
        weight,
        height,
        goalWeight,
        activityFrequency,
        updatedAt: new Date(),
      },
      { transaction: params.transaction }
    );

    const updatedProgress = await Progress.findOne({
      where: { userId },
      transaction: params.transaction,
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
}
