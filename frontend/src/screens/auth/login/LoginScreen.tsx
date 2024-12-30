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
import { HttpError } from "../../../@core/errors/httpError";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { wrongCredentialsMessage } from "./utils";
import { SecureStorage } from "../../../services/secureStorage/SecureStorage";
import { useSnackbar } from "../../../hooks/useSnackbar";
import styles from "../styles";
import { STORAGE_ACCESS_TOKEN } from "../../../constants/localStorageConstants";

const loginInitialState: LoginFormData = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const navigation = useAppNavigation();
  const scrollRef = useRef<ScrollView | null>(null);
  const { data, handleChange, setError, validateField, onSubmit } = useForm({
    initialState: loginInitialState,
  });
  const { values, error, isSubmitting } = data;

  function goBack() {
    navigation.goBack();
  }

  function scrollToTop() {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  async function handleSubmit() {
    if (!validateAllFields()) return;

    const { data } = await httpAuthService.login(values);
    await SecureStorage.setItem(STORAGE_ACCESS_TOKEN, data.token);

    navigation.dispatch(
      CommonActions.reset({ routes: [{ name: RouteConstants.ProfileForm }] })
    );
  }

  function handleError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    if (error instanceof HttpError) {
      if (error.status === 401) scrollToTop();
      setError(
        error.status === 401
          ? { field: "all", message: wrongCredentialsMessage }
          : { field: error.field as any, message: error.message }
      );
    }
    if (!(error as any).field) {
      showSnackbar({
        duration: 4000,
        message: error.message,
        variant: "error",
      });
    }
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

  return (
    <ScreenWrapper scrollable ref={scrollRef} snackbar={<Snackbar />}>
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
            onChangeText={(data) => handleChange("email", maskEmail(data))}
            onBlur={() => validateField("email", values.email, validateEmail)}
            autoFocus
            label="E-mail"
            placeholder="Ex: joaodasilva@email.com"
            textContentType="emailAddress"
            errorMessage={error.field === "email" ? error.message : undefined}
            value={values.email}
            disabled={isSubmitting}
            error={error.field === "email" || error.field === "all"}
          />
          <PasswordInput
            onChangeText={(data) => handleChange("password", data)}
            onBlur={() =>
              validateField("password", values.password, validateEmptyField)
            }
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
