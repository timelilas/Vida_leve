import { z } from "zod";
import { userZodSchema } from "../../utils/zod/schemas/user";

export const updateUserSchema = z
  .object({
    name: userZodSchema.shape.name.unwrap(),
    phone: userZodSchema.shape.phone.unwrap(),
    gender: userZodSchema.shape.gender.unwrap(),
    birthDate: userZodSchema.shape.birthDate,
  })
  .strict();
