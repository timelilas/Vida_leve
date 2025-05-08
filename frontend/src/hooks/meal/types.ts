import { MealType } from "../../@core/entities/@shared/mealType/type";

export interface CreateMealParams {
  date: Date;
  mealType: MealType;
  foods: { foodId: number; quantity: number }[];
}

export interface UpdateMealParams {
  mealId: number;
  foods: { foodId: number; quantity: number }[];
}
