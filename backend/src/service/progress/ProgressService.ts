import Progress from "../../database/models/Progress";
import { UpsertProgressDTO } from "./types";

export default class ProgressService {
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
