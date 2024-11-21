import { ZodHelper } from "../../utils/zod/helpers";
import { requiredMsg, stringMsg } from "../../utils/zod/messages";
import { userZodSchema } from "../../utils/zod/schemas";
import z from "zod";

export const signupSchema = userZodSchema
  .pick({
    name: true,
    email: true,
    password: true,
  })
  .extend({
    passwordConfirmation: z.string({
      invalid_type_error: stringMsg("Confirmação da senha"),
      required_error: requiredMsg("Confirmação da senha"),
    }),
  })
  .strict()
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Ops! As senhas estão diferentes. Confira e tente novamente!",
      path: ["passwordConfirmation"],
    }
  );

export const loginSchema = userZodSchema.pick({ email: true }).extend({
  password: z.string({
    invalid_type_error: stringMsg("Senha"),
    required_error: requiredMsg("Senha"),
  }),
});
