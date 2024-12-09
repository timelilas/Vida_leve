import { create } from "zustand";
import { ProgressStore, ProgressStoreState } from "./types";

const progressStoreInitialState: ProgressStoreState = {
  status: "idle",
  data: null,
};

export const useProgressStore = create<ProgressStore>((set) => ({
  ...progressStoreInitialState,
  setProgress: (data) => set(() => ({ status: "fulfilled", data })),
}));
