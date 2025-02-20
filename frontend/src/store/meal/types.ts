import { MealType } from "../../@core/entities/@shared/mealType/type";
import { FoodProps } from "../../@core/entities/food/type";
import { MealFoodProps, MealProps } from "../../@core/entities/meal/type";

export interface MealStoreState {
  type: MealType | null;
  date: string;
  foodIds: number[];
  foodMap: Record<string, MealFoodProps>;
}

export interface MealStoreActions {
  resetMeal: () => void;
  setMeal: (type: MealType, date: Date) => void;
  addFood: (food: FoodProps) => void;
  removeFood: (foodId: number) => void;
  decrementFoodQuantity: (foodId: number) => void;
}

export type MealStore = MealStoreState & MealStoreActions;
