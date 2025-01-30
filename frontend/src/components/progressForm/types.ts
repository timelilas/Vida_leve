import { ActitivyFrequency } from "../../@core/entities/@shared/activityFrequency/type";
import { GenderType } from "../../@core/entities/@shared/gender/type";
import { CaloriePlanProps } from "../../@core/entities/caloriePlan/type";
import { ProgressProps } from "../../@core/entities/progress/type";

export interface ProgressFormInitialData
  extends Pick<ProgressProps, "weight" | "goalWeight"> {
  height: string;
  activityFrequency: ActitivyFrequency | null;
  birthDate: string | null;
  gender: GenderType | null;
}

export type ProgressFormValidationResult<T> =
  | { success: false }
  | { success: true; data: T };

export interface OnProgressSubmitData {
  formData: Omit<ProgressProps, "currentCaloriePlan">;
  newCaloriePlans: CaloriePlanProps[];
}
