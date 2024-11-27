import { NavigationProp } from "@react-navigation/native";

export type ActitivyFrequency = "pouca" | "leve" | "moderada" | "intensa";

export type HealthFormScreenProps = {
  navigation: NavigationProp<any>;
};

export type HealthFormData = {
  height: string;
  weight: string;
  goalWeight: string;
  activityFrequency: ActitivyFrequency | null;
};
