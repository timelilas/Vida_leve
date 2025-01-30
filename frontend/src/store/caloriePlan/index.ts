import { create } from "zustand";
import { CaloriePlanStoreState, CaloriePlanStore } from "./types";

const initialState: CaloriePlanStoreState = {
  data: [],
};

export const useCaloriePlanStore = create<CaloriePlanStore>((set) => ({
  ...initialState,
  setPlans: (plans) =>
    set(() => ({ data: plans })),
}));
