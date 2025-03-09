import { MealType } from "../../@core/entities/@shared/mealType/type";
import { FoodProps } from "../../@core/entities/food/type";
import { MealFoodProps } from "../../@core/entities/meal/type";

type MealFoodState = MealFoodProps & { isExpanded: boolean };

export interface MealStoreState {
  type: MealType | null;
  date: string;
  foodIds: number[];
  foodMap: Record<string, MealFoodState>;
}

export interface MealStoreActions {
  setMeal: (type: MealType, date: Date) => void;
  addFood: (food: FoodProps) => void;
  removeFood: (foodId: number) => void;
  incrementFoodQuantity: (foodId: number) => void;
  decrementFoodQuantity: (foodId: number) => void;
  toggleItemExpansion: (foodId: number) => void;
  collapseAllItems: () => void;
}

export type MealStore = MealStoreState & MealStoreActions;
