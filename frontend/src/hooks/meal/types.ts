import { MealType } from "../../@core/entities/@shared/mealType/type";

export interface CreateMealParams {
  date: string;
  mealType: MealType;
  foods: Array<{ foodId: number; quantity: number }>;
}

export type CalorieConsumptionQueryState = Record<MealType | "total", number>;
