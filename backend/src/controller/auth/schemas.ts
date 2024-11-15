import { userZodSchema } from "../../utils/zod/schemas";

export const signupSchema = userZodSchema.pick({
  name: true,
  email: true,
  password: true,
});
export const loginSchema = userZodSchema.pick({ email: true, password: true });
