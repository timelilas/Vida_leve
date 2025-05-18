import { ActitivyFrequency } from "../../@core/entities/@shared/activityFrequency/type";
import { PlanType } from "../../@core/entities/@shared/planType/type";
import { ProgressProps } from "../../@core/entities/progress/type";

export type ProgressQueryState = {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: ActitivyFrequency;
  currentCaloriePlan: PlanType | null;
  lastWeightUpdateAt: string;
} | null;

export interface UpsertProgressParams
  extends Omit<ProgressProps, "currentCaloriePlan" | "lastWeightUpdateAt"> {
  currentCaloriePlan?: PlanType;
}
