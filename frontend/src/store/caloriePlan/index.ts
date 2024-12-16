import { create } from "zustand";
import { CaloriePlanStoreState, CaloriePlanStore } from "./types";

const initialState: CaloriePlanStoreState = {
  status: "idle",
  data: [],
};

export const useCaloriePlanStore = create<CaloriePlanStore>((set) => ({
  ...initialState,
  setPlans: (plans) =>
    set(() => ({ data: plans, status: "fulfilled", selectedPlan: null })),
}));
