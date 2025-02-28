import z from "zod";
import { floatRegexp, integerRegexp } from "../../utils/regexps";
import { defaultMissingFieldMsg } from "../../libs/zod/@shared/ messages";
import {
  MAX_USER_AGE,
  MIN_USER_AGE,
} from "../../@core/entities/user/constants";
import { zodActivityFrequencySchema } from "../../libs/zod/schemas/activityFrequency";
import { calculateWeightRangeByIMC } from "../../@core/entities/progress/helpers";
import { zodGenderSchema } from "../../libs/zod/schemas/gender";

const zodWeightSchema = z
  .string({ required_error: defaultMissingFieldMsg })
  .min(1, { message: defaultMissingFieldMsg })
  .refine((weight) => integerRegexp.test(weight), {
    message: "O peso atual deve ser um número inteiro.",
  })
  .refine(
    (weight) => {
      const intWeight = parseInt(weight);
      return intWeight >= 30 && intWeight <= 150;
    },
    {
      message:
        "Ops! Parece que houve um engano. O peso deve estar entre 30 kg e 150 kg. Por favor, ajuste o valor para continuar.",
    }
  );

const zodGoalWeightSchema = z
  .string({ required_error: defaultMissingFieldMsg })
  .min(1, { message: defaultMissingFieldMsg })
  .refine((goalWeight) => integerRegexp.test(goalWeight), {
    message: "O peso desejado deve ser um número inteiro.",
  });

const zodHeightSchema = z
  .string({ required_error: defaultMissingFieldMsg })
  .min(1, { message: defaultMissingFieldMsg })
  .refine((height) => floatRegexp.test(height), {
    message: "O altura deve ser um número decimal.",
  })
  .refine(
    (height) => {
      const floatHeight = parseFloat(height.replace(",", "."));
      return floatHeight >= 0.4 && floatHeight <= 3.0;
    },
    {
      message:
        "Atenção! Algo está fora do esperado. A altura precisa estar entre 0,40 m e 3,00 m. Por favor, ajuste o valor para continuar.",
    }
  );

const zodAgeSchema = z
  .number()
  .refine((age) => age >= MIN_USER_AGE && age <= MAX_USER_AGE, {
    message:
      "A idade permitida é entre 18 e 90 anos. Por favor, verifique sua data de nascimento.",
  });

export const zodProgressSchema = z
  .object({
    height: zodHeightSchema,
    weight: zodWeightSchema,
    goalWeight: zodGoalWeightSchema,
    activityFrequency: zodActivityFrequencySchema,
    age: zodAgeSchema,
    gender: zodGenderSchema,
  })
  .strict()
  .superRefine(({ age, height, goalWeight, gender }, ctx) => {
    const floatHeight = parseFloat(height.replace(",", "."));
    const intGoalWeight = parseInt(goalWeight);
    const { min, max } = calculateWeightRangeByIMC(age, floatHeight);

    if (intGoalWeight < min || intGoalWeight > max) {
      const genderLabel = gender === "masculino" ? "um homem" : "uma mulher";
      const heightAsString = `${height}`.replace(".", ",");

      ctx.addIssue({
        code: "custom",
        path: ["goalWeight"],
        message: `Quase lá! O peso saudável para ${genderLabel} de ${age} anos com ${heightAsString} m está entre ${min} kg e ${max} kg.`,
      });
    }
  });
