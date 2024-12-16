import { ProgressProps } from "../../../@core/entities/progress/progress";
import { ActitivyFrequency } from "../../../@core/entities/@shared/activityFrequency";

export type ProgressFormData = Pick<ProgressProps, "weight" | "goalWeight"> & {
  height: string;
  activityFrequency: ActitivyFrequency | null;
};
