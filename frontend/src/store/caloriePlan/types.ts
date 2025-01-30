import { CaloriePlanProps } from "../../@core/entities/caloriePlan/type";

export interface CaloriePlanStoreState {
  data: CaloriePlanProps[];
}

export interface CaloriePlanStoreActions {
  setPlans(plans: CaloriePlanProps[]): void;
}

export type CaloriePlanStore = CaloriePlanStoreState & CaloriePlanStoreActions;
