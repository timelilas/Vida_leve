import { create } from "zustand";
import { CaloriePlanStore, CaloriePlanStoreState } from "./types";

const initialState: CaloriePlanStoreState = {
  status: "idle",
  selectedPlan: null,
  data: [],
};

export const useCaloriePlanStore = create<CaloriePlanStore>((set) => ({
  ...initialState,
  setPlans: (plans) => set(() => ({ data: plans, status: "fulfilled" })),
  selectPlan: (type) => set(() => ({ selectedPlan: type })),
}));
