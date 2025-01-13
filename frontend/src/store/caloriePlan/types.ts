import { CaloriePlanProps } from "../../@core/entities/caloriePlan/type";

export interface CaloriePlanStoreState {
  status: "idle" | "loading" | "fulfilled";
  data: CaloriePlanProps[];
}

export interface CaloriePlanStoreActions {
  setPlans(plans: CaloriePlanProps[]): void;
}

export type CaloriePlanStore = CaloriePlanStoreState & CaloriePlanStoreActions;
