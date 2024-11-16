import { useForm } from "../../../hooks/useForm";
import { useRef } from "react";
import { ScrollView } from "react-native";
import { NavigationProp, StackActions } from "@react-navigation/native";
import { httpAuthService } from "../../../services/auth";
import { validateEmail } from "../../../utils/validations/email";
import { validatePassword } from "../../../utils/validations/password";
import { validatePasswordConfirmation } from "../../../utils/validations/passwordConfirmation";

const initialState = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

interface UseSignupFormParams {
  navigation: NavigationProp<any>;
}

export function useSignupForm({ navigation }: UseSignupFormParams) {
  const ref = useRef<ScrollView>(null);
  const { data, setError, handleChange, setIsLoading, validateField } =
    useForm(initialState);
  const { values, error, isLoading } = data;

  async function signup() {
    if (!validateAllFields()) return;
    setError({});
    setIsLoading(true);

    const result = await httpAuthService.signup(values);

    if (!result.success) {
      const field = result.error.field || undefined;
      setIsLoading(false);
      setError({ field: field as any, message: result.error.message });
      if (!field) {
        ref.current?.scrollTo({ y: 0, animated: true });
      }
    } else {
      navigation.dispatch(StackActions.replace("Auth/Login"));
    }
  }

  function validateAllFields() {
    const validationMap = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      passwordConfirmation: validatePasswordConfirmation(
        values.password,
        values.passwordConfirmation
      ),
    };

    for (const [field, validation] of Object.entries(validationMap)) {
      if (!validation.success) {
        const message = field !== "password" ? validation.error : undefined;
        setError({ field: field as any, message });
        return false;
      }
    }
    return true;
  }

  return {
    ref,
    error,
    values,
    isLoading,
    signup,
    validateField,
    handleChange,
  };
}
