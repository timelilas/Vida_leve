import z from "zod";
import { defaultMissingFieldMsg } from "../../@shared/ messages";

export const zodPasswordSchema = z
  .string({ required_error: defaultMissingFieldMsg })
  .min(8, "A Senha deve conter pelo menos 8 caracteres de extensão");
