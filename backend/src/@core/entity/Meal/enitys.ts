import { TypeMeal } from "../@shared";

export interface MealEntity {
    id: number;
    typeMeal: TypeMeal;
    userId: number;
    date: Date;
    totalCalories: number;
}