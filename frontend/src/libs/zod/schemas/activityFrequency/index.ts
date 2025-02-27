import z from "zod";
import { validActivityFrequencies } from "../../../../@core/entities/@shared/activityFrequency/constants";

const requiredMessage =
  "Por favor, selecione o seu nível de atividade física antes de continuar.";

export const zodActivityFrequencySchema = z
  .enum(validActivityFrequencies, {
    required_error: requiredMessage,
    invalid_type_error: requiredMessage,
  })
  .nullable()
  .superRefine((gender, ctx) => {
    if (!validActivityFrequencies.includes(gender as any)) {
      return ctx.addIssue({ code: "custom", message: requiredMessage });
    }
  });
