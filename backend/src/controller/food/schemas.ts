import { z } from "zod";
import { ZodHelper } from "../../utils/zod/helpers";
import { defaultQueryParamsZodSchema } from "../../utils/zod/schemas/query";

export const getFoodsQuerySchema = z.object({
  name: ZodHelper.baseString("Nome do alimento", 1, 100).optional(),
  limit: defaultQueryParamsZodSchema.shape.limit,
  offset: defaultQueryParamsZodSchema.shape.offset,
});
