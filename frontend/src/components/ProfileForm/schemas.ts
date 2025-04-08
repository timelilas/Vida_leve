import z from "zod";
import { zodPhoneSchema } from "../../libs/zod/schemas/phone";
import { zodDateStringSchema } from "../../libs/zod/schemas/date";
import { validateUserAge } from "../../@core/entities/user/helpers";
import { zodGenderSchema } from "../../libs/zod/schemas/gender";

const zodNameSchema = z
  .string({
    required_error: "Por favor, preencha o seu nome para continuar.",
  })
  .min(1, { message: "Por favor, preencha o seu nome para continuar." });

const birthDateZodSchema = zodDateStringSchema.refine(
  (dateState) => {
    const [day, month, year] = dateState
      .split("/")
      .map((value) => parseInt(value));
    return validateUserAge(new Date(year, month - 1, day));
  },
  {
    message:
      "A idade permitida é entre 18 e 90 anos. Por favor, verifique sua data de nascimento.",
  }
);

export const zodProfileSchema = z.object({
  name: zodNameSchema,
  phone: zodPhoneSchema,
  birthDate: birthDateZodSchema,
  gender: zodGenderSchema,
});
