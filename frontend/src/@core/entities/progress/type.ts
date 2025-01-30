import { PlanType } from "../@shared/planType/type";
import { ActitivyFrequency } from "../@shared/activityFrequency/type";

export interface ProgressProps {
  height: number; // altura em metros
  weight: number; // peso em quilogramas
  goalWeight: number; // meta de peso em quilogramas
  activityFrequency: ActitivyFrequency;
  currentCaloriePlan: PlanType | null;
}
