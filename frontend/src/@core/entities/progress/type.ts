import { PlanType } from "../@shared/planType/type";
import { ActitivyFrequency } from "../@shared/activityFrequency/type";

export interface ProgressProps {
  height: number; // altura em metros
  weight: number; // peso em quilogramas
  goalWeight: number; // meta de peso em quilogramas
  activityFrequency: ActitivyFrequency; // nível de atividade física diário
  currentCaloriePlan: PlanType | null; // atual plano de calorias
  lastWeightUpdateAt: Date; // data de última atualização do peso
}
