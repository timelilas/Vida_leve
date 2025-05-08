import { z } from "zod";
import { defaultQueryParamsZodSchema } from "../../utils/zod/schemas/query";
import { ZodHelper } from "../../utils/zod/helpers";

export const getWeightHistoryQuerySchema = z.object({
  limit: defaultQueryParamsZodSchema.shape.limit,
  offset: defaultQueryParamsZodSchema.shape.offset,
});

export const addWeightSchema = z.object({
  date: ZodHelper.date("data"),
  weight: ZodHelper.number("peso", 30, 150).int({
    message: "O peso deve ser um número inteiro.",
  }),
});
