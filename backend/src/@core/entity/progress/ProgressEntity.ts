import { ActivityFrequency, PlanType } from "../@shared";

export interface ProgressEntity {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: ActivityFrequency;
  currentCaloriePlan: PlanType | null;
}
