import { MealType } from "../../@core/entities/@shared/mealType/type";
import { PlanStrategy } from "../../@core/entities/@shared/panStrategy/type";
import { PlanType } from "../../@core/entities/@shared/planType/type";
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

export interface HttpGetMealsOutputDTO {
  meals: MealOutputDTO[];
  hasMore: boolean;
}

export interface HttpUpdateMealInputDTO {
  id: number;
  foods: Array<{ foodId: number; quantity: number }>;
}

export type HttpUpdateMealOutputDTO = MealOutputDTO;

export type HttpGetCalorieStatisticsOutputDTO = Array<{
  target: number;
  consumption: number;
  planType: PlanType;
  strategy: PlanStrategy;
  date: string;
}>;

export interface HttpGetCalorieStatisticsInputDTO {
  from: string;
  to: string;
}
