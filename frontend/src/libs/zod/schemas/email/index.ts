import z from "zod";
import { defaultMissingFieldMsg } from "../../@shared/ messages";

export const zodEmailSchema = z
  .string({ required_error: defaultMissingFieldMsg })
  .min(1, { message: defaultMissingFieldMsg })
  .email("O formato do e-mail está incorreto. Tente novamente assim: exemplo@dominio.com.");
