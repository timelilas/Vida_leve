import { ProgressProps } from "../../@core/entities/progress/type";

export interface ProgressStoreState {
  data: ProgressProps | null;
}

export interface ProgressStoreActions {
  setProgress(data: ProgressProps | null): void;
}

export type ProgressStore = ProgressStoreState & ProgressStoreActions;
