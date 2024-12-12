import z from "zod";
import { ZodHelper } from "../helpers";

export const progressZodSchema = z
  .object({
    height: ZodHelper.number("Altura", 0.4, 3.0),
    weight: ZodHelper.number("Peso atual", 0, 1000).int(
      "Peso atual deve ser um número inteiro"
    ),
    goalWeight: ZodHelper.number("Peso desejado", 0, 1000).int(
      "Peso desejado deve ser um número inteiro"
    ),
    activityFrequency: z.enum(["pouca", "leve", "moderada", "intensa"], {
      required_error: "Frequência de atividade física é um campo obrigatório",
      message:
        "Frequência de atividade física permite apenas os seguintes valores: pouca, leve, moderada e intensa",
    }),
  })
  .strict({ message: "Não é um campo válido" })
  .refine(({ goalWeight, weight }) => goalWeight !== weight, {
    message: "O peso desejado deve ser diferente do peso atual.",
    path: ["goalWeight"],
  });
