import { PlanType } from "../../@core/entities/@shared/planType/type";
import { CaloriePlanProps } from "../../@core/entities/caloriePlan/caloriePlan";

export interface CaloriePlanStoreState {
  status: "idle" | "loading" | "fulfilled";
  data: CaloriePlanProps[];
}

export interface CaloriePlanStoreActions {
  setPlans(plans: CaloriePlanProps[]): void;
}

export type CaloriePlanStore = CaloriePlanStoreState & CaloriePlanStoreActions;
