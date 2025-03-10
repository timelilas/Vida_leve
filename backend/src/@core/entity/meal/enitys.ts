import { TypeMeal } from "../@shared";
import { FoodEntity } from "../food/entity";

export interface MealEntity {
  id: number;
  date: Date;
  type: TypeMeal;
  foods: ConsumedFoodEntity[];
}

export interface ConsumedFoodEntity extends FoodEntity {
  quantity: number;
}
