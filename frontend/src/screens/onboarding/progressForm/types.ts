import { ProgressProps } from "../../../@core/entities/progress/progress";
import { NavigationProp } from "@react-navigation/native";
import { ActitivyFrequency } from "../../../@core/entities/@shared/activityFrequency";

export type ProgressFormScreenProps = {
  navigation: NavigationProp<any>;
};

export type ProgressFormData = Omit<ProgressProps, "activityFrequency"> & {
  activityFrequency: ActitivyFrequency | null;
};
