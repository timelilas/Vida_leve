import { ActitivyFrequency } from "../@shared/activityFrequency";

export interface ProgressProps {
  height: number; // altura é metros
  weight: number; // peso em quilogramas
  goalWeight: number; // meta de peso em quilogramas
  activityFrequency: ActitivyFrequency;
}
