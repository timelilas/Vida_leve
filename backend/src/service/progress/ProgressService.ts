import Progress from "../../database/models/Progress";
import User from "../../database/models/User";
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

  public getIdealPlan = async (userId: number) => {
    const user = await Progress.findOne({ where: { userId } });
    const userProgress = await User.findOne({ where: { id: userId } });

    if (!user || !userProgress) {
      return null;
    }

    return { ...user.toJSON(), ...userProgress.dataValues };
  };
}
