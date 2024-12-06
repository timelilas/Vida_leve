import { userZodSchema } from "../../utils/zod/schemas/user";

export const updateUserSchema = userZodSchema
  .pick({
    name: true,
    phone: true,
    birthDate: true,
    gender: true,
  })
  .strict();
