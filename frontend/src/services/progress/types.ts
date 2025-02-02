import { PlanType } from "../../@core/entities/@shared/planType/type";
import { ProgressProps } from "../../@core/entities/progress/type";

export interface HttpUpsertProgressInputDTO
  extends Omit<ProgressProps, "currentCaloriePlan"> {
  currentCaloriePlan?: PlanType;
}
