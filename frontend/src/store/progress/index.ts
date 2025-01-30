import { create } from "zustand";
import { ProgressStore, ProgressStoreState } from "./types";

const initialState: ProgressStoreState = {
  data: null,
};

export const useProgressStore = create<ProgressStore>((set) => ({
  ...initialState,
  setProgress: (data) => set(() => ({ data })),
}));
