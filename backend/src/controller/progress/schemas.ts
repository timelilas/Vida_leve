import { progressZodSchema } from "../../utils/zod/schemas/progress";

export const createProgressSchema = progressZodSchema
  .pick({
    height: true,
    weight: true,
    goalWeight: true,
    activityFrequency: true,
  })
  .strict();
