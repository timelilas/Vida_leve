import { StrategyType, TypeMeal } from "../../@core/entity/@shared";
import { MealEntity } from "../../@core/entity/meal/enitys";

export interface UpsertMealDTO {
  id?: number;
  userId: number;
  date: Date;
  mealType: TypeMeal;
  foods: Array<{ foodId: number; quantity: number }>;
}

export interface SearchMealDTO {
  userId: number;
  date: Date;
  mealType: TypeMeal;
}

export interface GetMealByIdDTO {
  userId: number;
  id: number;
}

export interface GetMealsDTO {
  userId: number;
  date?: Date;
  limit?: number;
  offset?: number;
}

export interface GetCalorieStatisticsDTO {
  userId: number;
  from: Date;
  to: Date;
}

export interface CalorieStatisticsQueryResult {
  date: string;
  type: TypeMeal;
  strategy: StrategyType;
  target: number;
  consumption: number;
}

export interface MealQueryResult extends Omit<MealEntity, "date"> {
  date: string;
}
