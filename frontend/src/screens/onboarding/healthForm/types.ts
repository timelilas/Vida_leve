import { NavigationProp } from "@react-navigation/native";
import { ActitivyFrequency } from "../../../@core/progress/progress";

export type HealthFormScreenProps = {
  navigation: NavigationProp<any>;
};

export type HealthFormData = {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: ActitivyFrequency | null;
};
