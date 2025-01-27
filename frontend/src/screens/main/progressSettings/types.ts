import { ActitivyFrequency } from "../../../@core/entities/@shared/activityFrequency/type";
import { ProgressProps } from "../../../@core/entities/progress/type";

export interface ProgressSettingsFormData
  extends Pick<ProgressProps, "weight" | "goalWeight"> {
  activityFrequency: ActitivyFrequency | null;
}
