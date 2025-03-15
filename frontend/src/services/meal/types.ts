import { MealType } from "../../@core/entities/@shared/mealType/type";
import { MealFoodProps } from "../../@core/entities/meal/type";

interface MealOutputDTO {
  id: number;
  type: MealType;
  date: string;
  foods: MealFoodProps[];
}

export interface HttpCreateMealInputDTO {
  date: Date;
  mealType: MealType;
  foods: Array<{ foodId: number; quantity: number }>;
}

export type HttpCreateMealOutputDTO = MealOutputDTO;

export type HttpGetMealsOutputDTO = Array<{
  id: number;
  type: MealType;
  date: string;
  foods: MealFoodProps[];
}>;

export interface HttpUpdateMealInputDTO {
  id: number;
  foods: Array<{ foodId: number; quantity: number }>;
}

export type HttpUpdateMealOutputDTO = MealOutputDTO;

export type HttpCalorieConsumptionOutputDTO = Record<
  MealType | "total",
  number
>;
