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
    resetMeal: (date?: Date) => {
      set(() => ({
        ...initialState,
        date: (date || new Date()).toISOString(),
      }));
    },
    addFood: (food) => {
      const prevState = get();
      const existingFood = prevState.foodMap[`${food.id}`];

      const newFoodMap: MealStoreState["foodMap"] = {};

      for (const foodId of prevState.foodIds) {
        const prevFoodState = prevState.foodMap[`${foodId}`];

        newFoodMap[`${foodId}`] = prevFoodState.isExpanded
          ? { ...prevState.foodMap[`${foodId}`], isExpanded: false }
          : prevFoodState;
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
    collapseAllItems: () => {
      set((prevState) => {
        return {
          foodMap: prevState.foodIds.reduce((acc, id) => {
            acc[`${id}`] = { ...prevState.foodMap[`${id}`], isExpanded: false };
            return acc;
          }, {} as MealStoreState["foodMap"]),
        };
      });
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
    incrementFoodQuantity: (foodId) => {
      const prevState = get();
      const existingFood = prevState.foodMap[`${foodId}`];

      if (!existingFood) return;

      const finalQuantity = existingFood.quantity + 1;

      return set(() => ({
        foodMap: {
          ...prevState.foodMap,
          [`${foodId}`]: {
            ...existingFood,
            quantity: finalQuantity >= 99 ? 99 : finalQuantity,
          },
        },
      }));
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

      const newFoodMap: MealStoreState["foodMap"] = {};

      for (const id of prevState.foodIds) {
        let currentFood = prevState.foodMap[`${id}`];

        if (foodId === id) {
          currentFood = { ...currentFood, isExpanded: !currentFood.isExpanded };
        } else if (foodId !== id && currentFood.isExpanded) {
          currentFood = { ...currentFood, isExpanded: false };
        }

        newFoodMap[`${id}`] = currentFood;
      }

      return set(() => ({ foodMap: newFoodMap }));
    },
  };
});
