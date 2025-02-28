import { ActitivyFrequency } from "../../@core/entities/@shared/activityFrequency/type";
import { GenderType } from "../../@core/entities/@shared/gender/type";
import { CaloriePlanProps } from "../../@core/entities/caloriePlan/type";
import { ProgressProps } from "../../@core/entities/progress/type";

export interface ProgressFormData {
  height: string;
  weight: string;
  goalWeight: string;
  birthDate: string;
  gender: GenderType | null;
  activityFrequency: ActitivyFrequency | null;
}

export interface OnProgressSubmitData {
  formData: Omit<ProgressProps, "currentCaloriePlan">;
  newCaloriePlans: CaloriePlanProps[];
}
