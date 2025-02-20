import { MealFoodProps } from "./type";

export function calculateMealCalories(foods: MealFoodProps[]) {
  const totalCalories = foods.reduce((total, food) => {
    return total + food.calories * food.quantity;
  }, 0);

  return totalCalories;
}
