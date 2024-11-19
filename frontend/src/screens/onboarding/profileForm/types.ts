import { NavigationProp } from "@react-navigation/native";

export type GenderType = "male" | "female";

export type ProfileFromScreenProps = {
  navigation: NavigationProp<any>;
};

export interface ProfileFormData {
  name: string;
  phone: string;
  birthDate: string;
  gender: string;
}
