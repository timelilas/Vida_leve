import z from "zod";
import { ZodHelper } from "../../utils/zod/helpers";
import { allowedTypeMeals } from "../../@core/entity/@shared";

const foodItemSchema = z
  .object({
    foodId: ZodHelper.number("Id do alimento", 1),
    quantity: ZodHelper.number("A quantidade do alimento", 1).int({
      message: "A Quantidade do alimento deve ser um número inteiro",
    }),
  })
  .strict();

export const createMealSchema = z
  .object({
    date: ZodHelper.date("Data da refeiçao"),
    mealType: z.enum(allowedTypeMeals, {
      required_error: "O tipo da refeição é um campo obrigatório",
      message:
        "O tipo de refeição permite apenas apenas os valores: 'cafe-da-manha', 'lanche', 'almoco', 'jantar',e 'outro'",
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
