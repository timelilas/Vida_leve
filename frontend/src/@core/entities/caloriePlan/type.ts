import { PlanType } from "../@shared/planType/type";

export interface CaloriePlanProps {
  type: PlanType;
  durationInDays: number; //duração do plano em dias
  dailyCalorieIntake: number; //meta de ingestão calórica diária em kcal/dia
}
