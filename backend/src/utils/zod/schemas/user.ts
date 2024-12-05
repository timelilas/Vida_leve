import z from "zod";
import { ZodHelper } from "../helpers";
import { userHelpers } from "../../../@core/entity/user/helpers";

export const userZodSchema = z
  .object({
    id: ZodHelper.number("Id", 1).int("Id deve ser um número inteiro"),
    email: ZodHelper.email("E-mail", 100),
    password: ZodHelper.password("Senha", 8, 100),
    name: ZodHelper.baseString("Nome completo", 1, 100).nullable(),
    phone: ZodHelper.phone("Telefone", 11).nullable(),
    birthDate: ZodHelper.date("Data de nascimento")
      .nullable()
      .refine(
        (isoDate) =>
          isoDate ? userHelpers.validateAge(new Date(isoDate)) : true,
        {
          message:
            "A idade permitida é entre 18 e 90 anos. Por favor, verifique sua data de nascimento.",
        }
      ),
    gender: z
      .enum(["masculino", "feminino"], {
        required_error: "Gênero social é um campo obrigatório",
        message:
          "Gênero social permite apenas os valores: masculino e feminino",
      })
      .nullable(),
  })
  .strict({ message: "Não é um campo válido" });
