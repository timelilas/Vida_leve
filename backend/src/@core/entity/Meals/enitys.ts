import { TypeMeal } from "../@shared";

export interface MealsEntity {
    id: number;
    typeMeals: TypeMeal;
    userId: number;
    date: Date;
    totalCalories: number;
}