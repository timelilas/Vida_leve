import z from "zod";
import { defaultMissingFieldMsg } from "../../@shared/ messages";

export const zodPhoneSchema = z
  .string({ required_error: defaultMissingFieldMsg })
  .min(1, { message: defaultMissingFieldMsg })
  .refine((phone) => phone.replace(/\D/g, "").length === 11, {
    message:
      "Ops! Número de telefone inválido. Tente algo como (99) 99999-9999.",
  });
