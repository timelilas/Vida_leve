import z from "zod";
import { ZodHelper } from "./helpers";

export const userZodSchema = z
  .object({
    id: ZodHelper.number("Id", 1).int("Id deve ser um número inteiro"),
    email: ZodHelper.email("E-mail", 100),
    password: ZodHelper.password("Senha", 8, 100),
    name: ZodHelper.string("Nome completo", 4, 100).nullable(),
    phone: ZodHelper.phone("Telefone", 11).nullable(),
    birthDate: ZodHelper.date("Data de nascimento").nullable(),
    gender: z
      .enum(["masculino", "feminino"], {
        message:
          "Gênero social permite apenas os valores: masculino e feminino",
      })
      .nullable(),
  })
  .strict({ message: "Não é um campo válido" });

export const progressZodSchema = z
  .object({
    id: ZodHelper.number("Id", 1).int("Id deve ser um número inteiro"),
    height: ZodHelper.number("Alura", 0, 9.99),
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
