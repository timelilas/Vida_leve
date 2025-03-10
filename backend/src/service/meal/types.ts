import { TypeMeal } from "../../@core/entity/@shared";
import { MealEntity } from "../../@core/entity/meal/enitys";

export interface CreateMealDTO {
  userId: number;
  date: Date;
  mealType: TypeMeal;
  foods: Array<{ foodId: number; quantity: number }>;
}

export interface CalorieConsumtionQueryResult {
  type: TypeMeal | "total";
  calories: number;
}

export interface MealQueryResult extends Omit<MealEntity, "date"> {
  date: string;
}

export interface GetCalorieConsumptionDTO {
  date: Date;
  userId: number;
}
