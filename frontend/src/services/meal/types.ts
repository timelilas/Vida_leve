import { MealType } from "../../@core/entities/@shared/mealType/type";
import { MealFoodProps } from "../../@core/entities/meal/type";

export interface HttpCreateMealInputDTO {
  date: string;
  mealType: MealType;
  foods: Array<{ foodId: number; quantity: number }>;
}

export interface HttpCreateMealOutputDTO {
  id: number;
  type: MealType;
  date: string;
  foods: MealFoodProps[];
}

export type HttpCalorieConsumptionOutputDTO = Record<
  MealType | "total",
  number
>;
