import { z } from "zod";
import { progressZodSchema } from "../../utils/zod/schemas/progress";

export const upsertProgressSchema = progressZodSchema._def.schema
  .omit({
    currentCaloriePlan: true,
    lastWeightUpdateAt: true,
  })
  .merge(
    z.object({
      currentCaloriePlan:
        progressZodSchema._def.schema.shape.currentCaloriePlan.optional(),
    })
  )
  .strict();

export const setCurrentCaloriePlanSchema = z
  .object({
    currentCaloriePlan: progressZodSchema._def.schema.shape.currentCaloriePlan,
  })
  .strict();
