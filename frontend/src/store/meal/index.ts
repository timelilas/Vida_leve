import { create } from "zustand";
import { MealStore, MealStoreState } from "./types";

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
    resetMeal: () => {
      set(() => {
        return { ...initialState, date: new Date().toISOString() };
      });
    },
    addFood: (food) => {
      const prevState = get();
      const existingFood = prevState.foodMap[`${food.id}`];

      const newFoodMap: MealStoreState["foodMap"] = {};

      for (const foodId of prevState.foodIds) {
        newFoodMap[`${foodId}`] = {
          ...prevState.foodMap[`${foodId}`],
          isExpanded: false,
        };
      }

      if (!existingFood) {
        newFoodMap[`${food.id}`] = { ...food, quantity: 1, isExpanded: true };

        return set(() => ({
          foodIds: [food.id, ...prevState.foodIds],
          foodMap: newFoodMap,
        }));
      }

      const finalQuantity = existingFood.quantity + 1;
      newFoodMap[`${food.id}`] = {
        ...existingFood,
        quantity: finalQuantity >= 99 ? 99 : finalQuantity,
        isExpanded: true,
      };
      return set(() => ({ foodMap: newFoodMap }));
    },
    removeFood(foodId) {
      const prevState = get();

      const newFoodMap: MealStoreState["foodMap"] = {};

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
    toggleItemExpansion(foodId) {
      const prevState = get();
      const existingFood = prevState.foodMap[`${foodId}`];

      if (!existingFood) return;

      return set(() => ({
        foodMap: {
          ...prevState.foodMap,
          [`${foodId}`]: {
            ...existingFood,
            isExpanded: !existingFood.isExpanded,
          },
        },
      }));
    },
  };
});
