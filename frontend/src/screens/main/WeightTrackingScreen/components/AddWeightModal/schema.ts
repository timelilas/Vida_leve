import z from "zod";
import { integerRegexp } from "../../../../../utils/regexps";

export const zodWeightFormSChema = z.object({
  weight: z
    .string({
      required_error: "Atenção! O peso é um campo obrigatório. Por favor, revise os dados."
    })
    .min(1, { message: "Atenção! O peso é um campo obrigatório. Por favor, revise os dados." })
    .refine((weight) => integerRegexp.test(weight), {
      message: "O peso deve ser um número inteiro."
    })
    .refine(
      (weight) => {
        const intWeight = parseInt(weight);
        return intWeight >= 30 && intWeight <= 150;
      },
      {
        message:
          "O peso registrado deve estar entre 30 kg e 150 kg. Por favor, ajuste o valor para continuar."
      }
    )
});
