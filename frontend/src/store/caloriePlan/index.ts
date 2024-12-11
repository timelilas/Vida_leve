import { create } from "zustand";
import { CaloriePlanStoreState, CaloriePlanStore } from "./types";

const initialState: CaloriePlanStoreState = {
  status: "idle",
  selectedPlan: null,
  data: [],
};

export const useCaloriePlanStore = create<CaloriePlanStore>((set) => ({
  ...initialState,
  selectPlan: (type) => set(() => ({ selectedPlan: type })),
  setPlans: (plans) =>
    set(() => ({ data: plans, status: "fulfilled", selectedPlan: null })),
}));
