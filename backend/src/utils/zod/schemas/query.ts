import z from "zod";

export const defaultQueryParamsZodSchema = z.object({
  limit: z
    .string({ invalid_type_error: "Limit deve ser um número." })
    .min(1, { message: "Limit de ter no mínimo 1 caractere" })
    .optional()
    .refine((Limit) => (Limit ? Limit.match(/^\d+$/) : true), {
      message: "Limit deve ser um número inteiro.",
    })
    .refine((limit) => (limit ? parseInt(limit) > 0 : true), {
      message: "Limit deve ser maior do que 0",
    })
    .transform((Limit) => (Limit ? parseInt(Limit) : Limit)),
  offset: z
    .string({ invalid_type_error: "Offset deve ser um número." })
    .min(1, { message: "Offset de ter no mínimo 1 caractere" })
    .optional()
    .refine((offset) => (offset ? offset.match(/^\d+$/) : true), {
      message: "Offset deve ser um número inteiro.",
    })
    .refine((limit) => (limit ? parseInt(limit) >= 0 : true), {
      message: "Offset deve ser maior ou igual à 0",
    })
    .transform((offset) => (offset ? parseInt(offset) : offset)),
});
