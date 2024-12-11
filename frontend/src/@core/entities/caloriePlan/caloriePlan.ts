import { PlanType } from "../@shared/plantType";

export interface CaloriePlanProps {
  type: PlanType;
  durationInDays: number; //duração do plano em dias
  dailyCalorieIntake: number; //meta de ingestão diária de calorias em kcal/dia
}
