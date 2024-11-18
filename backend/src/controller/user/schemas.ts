import { userZodSchema } from "../../utils/zod/schemas";

export const updateUserSchema = userZodSchema
  .pick({
    name: true,
    phone: true,
    birthDate: true,
    gender: true,
  })
  .partial();
