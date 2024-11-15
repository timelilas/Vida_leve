import z from "zod";
import { ZodHelper } from "./helpers";

export const userZodSchema = z
  .object({
    id: ZodHelper.number(1).int("Deve ser um número inteiro"),
    email: ZodHelper.email(100),
    password: ZodHelper.password(8, 100),
    name: ZodHelper.string(4, 100).nullable(),
    phone: ZodHelper.phone(11).nullable(),
    birthDate: ZodHelper.date().nullable(),
    gender: z
      .enum(["masculino", "feminino"], {
        message: "Permite apenas os valores: masculino e feminino",
      })
      .nullable(),
  })
  .strict({ message: "Não é um campo válido" });

export const progressZodSchema = z
  .object({
    id: ZodHelper.number(1).int("Deve ser um número inteiro"),
    height: ZodHelper.number(0, 9.99),
    weight: ZodHelper.number(0, 1000).int("Deve ser um número inteiro"),
    goalWeight: ZodHelper.number(0, 1000).int("Deve ser um número inteiro"),
    activityFrequency: ZodHelper.string(4, 100),
  })
  .strict({ message: "Não é um campo válido" });
