import { ActitivyFrequency } from "../../@core/entities/@shared/activityFrequency/type";
import { PlanType } from "../../@core/entities/@shared/planType/type";

export interface HttpUpsertProgressInputDTO {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: ActitivyFrequency;
  currentCaloriePlan?: PlanType;
}

export interface HttpProgressOutputDTO {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: ActitivyFrequency;
  currentCaloriePlan: PlanType | null;
  lastWeightUpdateAt: string;
}
