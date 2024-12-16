import { ProgressProps } from "../../../@core/entities/progress/progress";
import { ActitivyFrequency } from "../../../@core/entities/@shared/activityFrequency";

export type ProgressFormData = Pick<
  ProgressProps,
  "weight" | "height" | "goalWeight"
> & {
  activityFrequency: ActitivyFrequency | null;
};
