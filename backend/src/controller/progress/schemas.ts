import { progressZodSchema } from "../../utils/zod/schemas";

export const createProgressSchema = progressZodSchema.pick({
  altura: true,
  peso: true,
  meta: true,
  atividade: true
}).strict()