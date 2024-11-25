import { NavigationProp } from "@react-navigation/native";

export type ActitivyFrequency = "pouca" | "leve" | "moderada" | "intensa";

export type NutritionFormScreenProps = {
  navigation: NavigationProp<any>;
};

export type NutritionFormData = {
  height: string;
  weight: string;
  goalWeight: string;
  activityFrequency: ActitivyFrequency | null;
};
