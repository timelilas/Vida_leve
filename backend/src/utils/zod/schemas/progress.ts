import z from "zod";
import { ZodHelper } from "../helpers";

export const progressZodSchema = z
  .object({
    id: ZodHelper.number("Id", 1).int("Id deve ser um número inteiro"),
    height: ZodHelper.number("Altura", 0, 9.99),
    weight: ZodHelper.number("Peso atual", 0, 1000).int(
      "Peso atual deve ser um número inteiro"
    ),
    goalWeight: ZodHelper.number("Peso desejado", 0, 1000).int(
      "Peso desejado deve ser um número inteiro"
    ),
    activityFrequency: ZodHelper.string(
      "Frequência de atividade física",
      4,
      100
    ),
  })
  .strict({ message: "Não é um campo válido" });
