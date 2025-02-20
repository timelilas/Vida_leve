import { MealType } from "../@shared/mealType/type";
import { FoodProps } from "../food/type";

export interface MealFoodProps extends FoodProps {
  quantity: number;
}

export interface MealProps {
  type: MealType;
  date: Date;
  foods: MealFoodProps[];
}
