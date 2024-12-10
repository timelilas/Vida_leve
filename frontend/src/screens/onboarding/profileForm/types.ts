import { NavigationProp } from "@react-navigation/native";
import { GenderType } from "../../../@core/user/user";

export type ProfileFromScreenProps = {
  navigation: NavigationProp<any>;
};

export interface ProfileFormData {
  name: string;
  phone: string;
  birthDate: string;
  gender: GenderType | null;
}
