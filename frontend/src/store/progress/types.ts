import { ProgressProps } from "../../@core/entities/progress/type";

export interface ProgressStoreState {
  status: "idle" | "loading" | "fulfilled";
  data: ProgressProps | null;
}

export interface ProgressStoreActions {
  setProgress(data: ProgressProps | null): void;
}

export type ProgressStore = ProgressStoreState & ProgressStoreActions;
