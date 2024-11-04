import { userZodSchema } from "../../utils/zod/schemas";

export const updateUserSchema = userZodSchema.pick({
  userName: true, 
  telefone: true, 
  aniversario: true, 
  sexo: true
}).partial()