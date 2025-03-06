import { PlanType } from "../../@core/entities/@shared/planType/type";
import { ProgressProps } from "../../@core/entities/progress/type";

export type ProgressQueryState = ProgressProps | null;

export interface UpdateProgressParams
  extends Omit<ProgressProps, "currentCaloriePlan"> {
  currentCaloriePlan?: PlanType;
}
