import z from "zod"
import { ZodHelper } from "./helpers"

export const userZodSchema = z.object({
  id: ZodHelper.number(1).int("Deve ser um número inteiro"),
  userName: ZodHelper.string(4, 100),
  email: ZodHelper.email(100),
  senha: ZodHelper.password(8, 100),
  telefone: ZodHelper.phone(11).nullable(),
  aniversario: ZodHelper.date().nullable(),
  sexo: z.enum(
      ["masculino", "feminino"],
      {message: "Permite apenas os valores: masculino e feminino"}
    ).nullable()
}).strict({message: "Não é um campo válido"})

export const progressZodSchema = z.object({
  id: ZodHelper.number(1).int("Deve ser um número inteiro"),
  altura: ZodHelper.number(0, 9.99),
  peso: ZodHelper.number(0, 1000).int("Deve ser um número inteiro"),
  meta: ZodHelper.number(0, 1000).int("Deve ser um número inteiro"),
  telefone: ZodHelper.phone(11).nullable(),
  atividade: ZodHelper.string(4, 100)
}).strict({message: "Não é um campo válido"})