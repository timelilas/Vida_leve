import { NavigationProp } from "@react-navigation/native";

export type SignupFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type SignupScreenProps = {
  navigation: NavigationProp<any>;
};
