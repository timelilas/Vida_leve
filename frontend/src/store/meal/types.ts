import { MealType } from "../../@core/entities/@shared/mealType/type";
import { FoodProps } from "../../@core/entities/food/type";
import { MealFoodProps, MealProps } from "../../@core/entities/meal/type";
import { Optional } from "../../@types";

type MealFoodState = MealFoodProps & { isExpanded: boolean };

type SetMealParams = Optional<MealProps, "id">;

export interface MealStoreState {
  id?: number;
  type: MealType | null;
  date: string;
  foodIds: number[];
  foodMap: Record<string, MealFoodState>;
}

export interface MealStoreActions {
  setMeal: (data: SetMealParams) => void;
  addFood: (food: FoodProps) => void;
  removeFood: (foodId: number) => void;
  incrementFoodQuantity: (foodId: number) => void;
  decrementFoodQuantity: (foodId: number) => void;
  toggleItemExpansion: (foodId: number) => void;
  collapseAllItems: () => void;
}

export type MealStore = MealStoreState & MealStoreActions;
