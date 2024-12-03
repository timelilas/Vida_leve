import Progress from "../../database/models/Progress";
import { CreateProgressDTO, UpsertProgressDTO } from "./types";

export default class ProgressService {
  public create = async (params: CreateProgressDTO) => {
    const { userId, weight, height, goalWeight, activityFrequency } = params;

    const createdProgress = await Progress.create({
      userId,
      weight,
      height,
      goalWeight,
      activityFrequency,
    });
    return createdProgress.toJSON();
  };

  public upsert = async (params: UpsertProgressDTO) => {
    const { userId, weight, height, goalWeight, activityFrequency } = params;

    await Progress.upsert({
      userId,
      weight,
      height,
      goalWeight,
      activityFrequency,
    });

    const updatedProgress = await Progress.findOne({ where: { userId } });
    return (updatedProgress as Progress).toJSON();
  };
}
