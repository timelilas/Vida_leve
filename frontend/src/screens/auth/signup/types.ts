import { NavigationProp } from "@react-navigation/native";

export type UseSignupFormParams = {
  navigation: NavigationProp<any>;
};

export type SignupFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type SignupScreenProps = {
  navigation: NavigationProp<any>;
};
