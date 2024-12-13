import { z } from "zod";
import { progressZodSchema } from "../../utils/zod/schemas/progress";

export const createProgressSchema = progressZodSchema._def.schema.omit({
  currentCaloriePlan: true,
});

export const setCurrentCaloriePlanSchema = z
  .object({
    currentCaloriePlan: progressZodSchema._def.schema.shape.currentCaloriePlan,
  })
  .strict();
