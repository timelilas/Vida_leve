import z from "zod";
import { defaultMissingFieldMsg } from "../../@shared/ messages";

export const zodDateStringSchema = z
  .string({ required_error: defaultMissingFieldMsg })
  .min(1, { message: defaultMissingFieldMsg })
  .refine(
    (dateString) => !!dateString.match(/^([0-9]){2}\/([0-9]){2}\/([0-9]){4}$/),
    {
      message:
        "A data deve estar no formato dd/mm/aaaa, como por exemplo, 21/11/2024.",
    }
  )
  .refine(
    (dateString) => {
      const [day, month, year] = dateString
        .split("/")
        .map((value) => parseInt(value));

      if (month < 1 || month > 12) return false;
      if (day < 1 || day > new Date(year, month - 1, 0).getDate()) return false;
      return true;
    },
    {
      message:
        "Ops! Você digitou uma data inválida. Confira e tente novamente.",
    }
  );
