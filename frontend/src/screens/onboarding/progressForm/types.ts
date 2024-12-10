import { NavigationProp } from "@react-navigation/native";
import { ActitivyFrequency } from "../../../@core/entities/progress/progress";

export type ProgressFormScreenProps = {
  navigation: NavigationProp<any>;
};

export type ProgressFormData = {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: ActitivyFrequency | null;
};
