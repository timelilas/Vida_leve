import { PlanType } from "../../@core/entities/@shared/plantType";
import { CaloriePlanProps } from "../../@core/entities/caloriePlan/caloriePlan";

export interface CaloriePlanStoreState {
  status: "idle" | "loading" | "fulfilled";
  selectedPlan: PlanType | null;
  data: CaloriePlanProps[];
}

export interface CaloriePlanStoreActions {
  setPlans(plans: CaloriePlanProps[]): void;
  selectPlan(type: PlanType | null): void;
}

export type CaloriePlanStore = CaloriePlanStoreState & CaloriePlanStoreActions;
