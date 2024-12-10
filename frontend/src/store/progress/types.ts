import { ProgressProps } from "../../@core/entities/progress/progress";

export interface ProgressStoreState {
  status: "idle" | "loading" | "fulfilled";
  data: ProgressProps | null;
}

export interface ProgressStoreActions {
  setProgress(data: ProgressProps): void;
}

export type ProgressStore = ProgressStoreState & ProgressStoreActions;
