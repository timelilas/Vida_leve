import Progress from "../../database/models/Progress";
import { CreateProgressDTO } from "./types";

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
}
