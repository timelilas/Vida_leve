import { ZodHelper } from "../../utils/zod/helpers";
import { requiredMsg, stringMsg } from "../../utils/zod/messages";
import { userZodSchema } from "../../utils/zod/schemas/user";

import z from "zod";

export const signupSchema = userZodSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    passwordConfirmation: ZodHelper.baseString("Confirmação da senha", 1),
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
