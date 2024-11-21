import { NavigationProp } from "@react-navigation/native";

export type GenderType = "masculino" | "feminino";

export type ProfileFromScreenProps = {
  navigation: NavigationProp<any>;
};

export interface ProfileFormData {
  name: string;
  phone: string;
  birthDate: string;
  gender: string;
}
