import { TypeMeal } from "../../@core/entity/@shared";

export interface CreateMealDTO {
  userId: number;
  date: Date;
  mealType: TypeMeal;
  foods: Array<{ foodId: number; quantity: number }>;
}
