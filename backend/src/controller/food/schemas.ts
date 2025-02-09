import { z } from "zod";
import { ZodHelper } from "../../utils/zod/helpers";

export const getFoodsQuerySchema = z.object({
  name: ZodHelper.baseString("Nome do alimento", 1).optional(),
  limit: z
    .string({ invalid_type_error: "Limit deve ser um número." })
    .min(1, { message: "Limit de ter no mínimo 1 caractere" })
    .optional()
    .refine((Limit) => (Limit ? Limit.match(/^\d+$/) : true), {
      message: "Limit deve ser um número inteiro.",
    })
    .transform((Limit) => (Limit ? parseInt(Limit) : Limit)),
  offset: z
    .string({ invalid_type_error: "Offset deve ser um número." })
    .min(1, { message: "Offset de ter no mínimo 1 caractere" })
    .optional()
    .refine((offset) => (offset ? offset.match(/^\d+$/) : true), {
      message: "Offset deve ser um número inteiro.",
    })
    .transform((offset) => (offset ? parseInt(offset) : offset)),
});
