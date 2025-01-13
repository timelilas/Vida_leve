import { ProgressProps } from "../../../@core/entities/progress/type";
import { ActitivyFrequency } from "../../../@core/entities/@shared/activityFrequency/type";

export type ProgressFormData = Pick<ProgressProps, "weight" | "goalWeight"> & {
  height: string;
  activityFrequency: ActitivyFrequency | null;
};
