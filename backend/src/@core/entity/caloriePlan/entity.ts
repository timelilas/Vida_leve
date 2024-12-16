import { PlanType } from "../@shared";

export interface CaloriePlanEntity {
  type: PlanType;
  durationInDays: number; //duração do plano em dias
  dailyCalorieIntake: number; //meta de ingestão diária de calorias em kcal/dia
}
