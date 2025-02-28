import z from "zod";
import { validGenders } from "../../../../@core/entities/@shared/gender/constants";

const requiredMessage = "Por favor, selecione um gênero antes de continuar.";

export const zodGenderSchema = z
  .enum(validGenders, {
    required_error: requiredMessage,
    invalid_type_error: requiredMessage,
  })
  .nullable()
  .superRefine((gender, ctx) => {
    if (!validGenders.includes(gender as any)) {
      return ctx.addIssue({ code: "custom", message: requiredMessage });
    }
  });
