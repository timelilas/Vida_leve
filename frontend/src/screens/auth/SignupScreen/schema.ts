import z from "zod";
import { zodEmailSchema } from "../../../libs/zod/schemas/email";
import { defaultMissingFieldMsg } from "../../../libs/zod/@shared/ messages";
import { zodPasswordSchema } from "../../../libs/zod/schemas/password";
import {
  validateLowercasePassword,
  validateNumericPassword,
  validatePasswordSymbols,
  validateUppercasePassword,
} from "../../../utils/validations/password";

export const zodSignupSchema = z
  .object({
    email: zodEmailSchema,
    password: zodPasswordSchema
      .refine((password) => validateLowercasePassword(password), {
        message: "A senha deve conter letras minúsculas (a-z).",
      })
      .refine((password) => validateUppercasePassword(password), {
        message: "A senha deve conter letras maiúsculas (A-Z).",
      })
      .refine((password) => validateNumericPassword(password), {
        message: "A senha deve conter números (0-9).",
      })
      .refine((password) => validatePasswordSymbols(password), {
        message: "A senha deve conter caracteres especiais (ex: !@#$%^&*.,)",
      }),
    passwordConfirmation: z
      .string({
        required_error: defaultMissingFieldMsg,
      })
      .min(1, { message: defaultMissingFieldMsg }),
  })
  .strict()
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Ops! As senhas estão diferentes. Confira e tente novamente!",
      path: ["passwordConfirmation"],
    }
  );
