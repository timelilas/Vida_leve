import { create } from "zustand";
import { MealStore, MealStoreState } from "./types";
import { MealFoodProps } from "../../@core/entities/meal/type";

const initialState: MealStoreState = {
  date: new Date().toISOString(),
  foodIds: [],
  type: null,
  foodMap: {},
};

export const useMealStore = create<MealStore>((set, get) => {
  return {
    ...initialState,
    setMeal(type, date) {
      set(() => ({ type, date: date.toISOString() }));
    },
    addFood: (food) => {
      const prevState = get();
      const existingFood = prevState.foodMap[`${food.id}`];

      if (!existingFood) {
        return set(() => ({
          foodIds: [food.id, ...prevState.foodIds],
          foodMap: {
            ...prevState.foodMap,
            [food.id]: { ...food, quantity: 1 },
          },
        }));
      }

      return set(() => {
        const finalQuantity = existingFood.quantity + 1;
        return {
          foodMap: {
            ...prevState.foodMap,
            [`${food.id}`]: {
              ...existingFood,
              quantity: finalQuantity >= 99 ? 99 : finalQuantity,
            },
          },
        };
      });
    },
    resetMeal: () => {
      set(() => {
        return { ...initialState, date: new Date().toISOString() };
      });
    },
    removeFood(foodId) {
      const prevState = get();

      const newFoodMap: Record<string, MealFoodProps> = {};

      for (const key in prevState.foodMap) {
        if (prevState.foodMap[key].id !== foodId) {
          newFoodMap[key] = prevState.foodMap[key];
        }
      }
      set(() => {
        return {
          foodIds: prevState.foodIds.filter((id) => id !== foodId),
          foodMap: newFoodMap,
        };
      });
    },
    decrementFoodQuantity(foodId) {
      const prevState = get();
      const existingFood = prevState.foodMap[`${foodId}`];

      if (existingFood) {
        const finalQuantity = existingFood.quantity - 1;

        set(() => {
          return {
            foodMap: {
              ...prevState.foodMap,
              [`${foodId}`]: {
                ...existingFood,
                quantity: finalQuantity <= 0 ? 1 : finalQuantity,
              },
            },
          };
        });
      }
    },
  };
});
