import { useRef } from "react";
import { View, ScrollView } from "react-native";
import { LogoSVG } from "../../../components/logos/LogoSVG";
import { CommonActions } from "@react-navigation/native";
import { Input } from "../../../components/inputs/Input";
import { PasswordInput } from "../../../components/inputs/PasswordInput";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { httpAuthService } from "../../../services/auth";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { useForm } from "../../../hooks/useForm";
import { validateEmail } from "../../../utils/validations/email";
import { validateEmptyField } from "../../../utils/validations/common";
import { LoginFormData } from "./types";
import { maskEmail } from "../../../utils/masks";
import { HeaderNavigator } from "../../../components/HeaderNavigator";
import styles from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HttpError } from "../../../@core/errors/httpError";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";

const loginInitialState: LoginFormData = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const navigation = useAppNavigation();
  const scrollRef = useRef<ScrollView | null>(null);
  const { data, handleChange, setError, validateField, onSubmit } = useForm({
    initialState: loginInitialState,
  });
  const { values, error, isSubmitting } = data;

  async function handleSubmit() {
    if (!validateAllFields()) return;

    const { data } = await httpAuthService.login(values);
    await AsyncStorage.setItem("token", data.token);
    navigation.dispatch(
      CommonActions.reset({ routes: [{ name: RouteConstants.ProfileForm }] })
    );
  }

  function handleError(error: Error) {
    if (error instanceof HttpError) {
      error.field && scrollRef.current?.scrollTo({ y: 0, animated: true });
      return setError({ field: "all", message: error.message });
    }
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    setError({ message: UNEXPECTED_ERROR_MESSAGE });
  }

  function validateAllFields() {
    const validationMap = {
      email: validateEmail(values.email),
      password: validateEmptyField(values.password),
    };

    for (const [field, validation] of Object.entries(validationMap)) {
      if (!validation.success) {
        setError({ field: field as any, message: validation.error });
        return false;
      }
    }
    return true;
  }

  function goBack() {
    navigation.goBack();
  }

  return (
    <ScreenWrapper scrollable ref={scrollRef}>
      <View style={styles.container}>
        <HeaderNavigator onGoBack={goBack} style={styles.headerNavigator} />
        <LogoSVG style={styles.logo} />
        {error.message && (!error.field || error.field === "all") && (
          <ErrorMessage style={styles.error} message={error.message} />
        )}
        <ScreenTitle
          style={styles.title}
          title={`Boas vindas!\nEntre em sua conta para continuar`}
        />
        <View style={styles.form}>
          <Input
            onChange={(data) => handleChange("email", maskEmail(data))}
            onBlur={() => validateField("email", values.email, validateEmail)}
            autoFocus
            name="email"
            label="E-mail"
            placeholder="Ex: joaodasilva@email.com"
            textContentType="emailAddress"
            errorMessage={error.field === "email" ? error.message : undefined}
            value={values.email}
            disabled={isSubmitting}
            error={error.field === "email" || error.field === "all"}
          />
          <PasswordInput
            onChange={(data) => handleChange("password", data)}
            onBlur={() =>
              validateField("password", values.password, validateEmptyField)
            }
            name="password"
            label="Senha"
            placeholder="**********"
            value={values.password}
            errorMessage={
              error.field === "password" ? error.message : undefined
            }
            disabled={isSubmitting}
            error={error.field === "password" || error.field === "all"}
          />
        </View>
        <SubmitButton
          disabled={isSubmitting}
          style={styles.button}
          title="Continuar"
          type="primary"
          onPress={onSubmit(handleSubmit, handleError)}
        />
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
