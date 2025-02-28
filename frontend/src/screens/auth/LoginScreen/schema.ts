import z from "zod";
import { zodEmailSchema } from "../../../libs/zod/schemas/email";
import { zodPasswordSchema } from "../../../libs/zod/schemas/password";

export const zodLoginSchema = z
  .object({
    email: zodEmailSchema,
    password: zodPasswordSchema,
  })
  .strict();
