import { NavigationProp } from "@react-navigation/native";

export type LoginScreenProps = {
  navigation: NavigationProp<any>;
};

export type LoginFormData = {
  email: string;
  password: string;
};
