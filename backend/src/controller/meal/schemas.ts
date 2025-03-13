import z from "zod";
import { ZodHelper } from "../../utils/zod/helpers";
import { allowedTypeMeals } from "../../@core/entity/@shared";

const dateOnlyISOSchema = z
  .string({ required_error: "A data é um campo obrigatório" })
  .refine(
    (date) => {
      const validDateSchema = /^\d{4}\-\d{2}\-\d{2}$/.test(date);
      const [year, month, day] = date.split("-").map(Number);
      const parsedDate = new Date(year, month - 1, day);

      return (
        validDateSchema &&
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month - 1 &&
        parsedDate.getDate() === day
      );
    },
    {
      message: "Data inválida. A data precisa seguir o padrão ISO AAAA-MM-DD",
    }
  );

const foodItemSchema = z
  .object({
    foodId: ZodHelper.number("Id do alimento", 1),
    quantity: ZodHelper.number("A quantidade do alimento", 1).int({
      message: "A Quantidade do alimento deve ser um número inteiro",
    }),
  })
  .strict();

const mealSchema = z
  .object({
    id: ZodHelper.number("Id", 1).int("Id deve ser um número inteiro"),
    date: ZodHelper.date("Data da refeiçao"),
    mealType: z.enum(allowedTypeMeals, {
      required_error: "O tipo da refeição é um campo obrigatório",
      message:
        "O tipo de refeição permite apenas apenas os valores: 'cafe-da-manha', 'lanche', 'almoco', 'jantar' e 'outro'",
    }),
    foods: z
      .array(foodItemSchema, {
        required_error: "O campo de alimentos é obrigatório",
        invalid_type_error: "O campo de alimentos deve ser do tipo array",
      })
      .min(1, {
        message: "O array de alimentos deve conter pelo menos 1 item.",
      }),
  })
  .strict();

export const updateMealSchema = mealSchema.pick({ foods: true, id: true });

export const createMealSchema = mealSchema.pick({
  date: true,
  mealType: true,
  foods: true,
});

export const getMealsSchema = z.object({
  date: dateOnlyISOSchema.optional(),
});

export const getCalorieConsumptionSchema = z
  .object({ date: dateOnlyISOSchema })
  .strict();
