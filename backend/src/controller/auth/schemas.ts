import { userZodSchema } from "../../utils/zod/schemas";

export const signupSchema = userZodSchema.pick({userName: true, email: true, senha: true})
export const loginSchema = userZodSchema.pick({email: true, senha: true})