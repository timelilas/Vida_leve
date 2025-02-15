import { useRef } from "react";
import { View, ScrollView } from "react-native";
import { LogoSVG } from "../../../components/Logos/LogoSVG";
import { Input } from "../../../components/Input";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { SubmitButton } from "../../../components/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { httpAuthService } from "../../../services/auth";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { useForm } from "../../../hooks/useForm";
import { validateEmail } from "../../../utils/validations/email";
import { validateEmptyField } from "../../../utils/validations/common";
import { LoginFormData } from "./types";
import { maskEmail } from "../../../utils/masks";
import { HttpError } from "../../../@core/errors/httpError";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { wrongCredentialsMessage } from "./utils";
import { SecureStorage } from "../../../services/secureStorage/SecureStorage";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { STORAGE_ACCESS_TOKEN } from "../../../constants/localStorageConstants";
import { httpUserService } from "../../../services/user";
import { httpProgressService } from "../../../services/progress";
import { httpCaloriePlanService } from "../../../services/caloriePlan";
import { useProgressStore } from "../../../store/progress";
import { useUserStore } from "../../../store/user";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
import { useNavigationAfterLogin } from "./hooks/useNavigationAfterLogin";
import styles from "../styles";
import { NavigationHeader } from "../../../components/NavigationHeader";

const loginInitialState: LoginFormData = { email: "", password: "" };

const LoginScreen = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setPlans = useCaloriePlanStore((state) => state.setPlans);
  const setProgress = useProgressStore((state) => state.setProgress);

  const {
    naivgateToHome,
    navigateToProfileForm,
    navigateToProgressForm,
    navigateToPlanSelection,
  } = useNavigationAfterLogin();

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

  async function handleSubmit() {
    if (!validateAllFields()) return;

    const { data } = await httpAuthService.login(values);

    await SecureStorage.setItem(STORAGE_ACCESS_TOKEN, data.token);

    await handleNavigationAfterLogin();
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

  async function handleNavigationAfterLogin() {
    const { user, progress, plans } = await getOnboardingData();

    if (!user.birthDate || !user.gender || !user.phone || !user.name) {
      return navigateToProfileForm();
    }
    if (!progress || !plans.length) {
      return navigateToProgressForm();
    }
    if (!progress.currentCaloriePlan) {
      return navigateToPlanSelection();
    }

    return naivgateToHome();
  }

  async function getOnboardingData() {
    const [{ data: user }, { data: progress }, { data: plans }] =
      await Promise.all([
        httpUserService.getProfile(),
        httpProgressService.getProgress(),
        httpCaloriePlanService.getPlans(),
      ]);

    setUser(user);
    setPlans(plans);
    setProgress(progress);

    return { user, progress, plans };
  }

  return (
    <ScreenWrapper ref={scrollRef} snackbar={<Snackbar />}>
      <NavigationHeader variant="default" onBack={goBack} />
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
        <Input.Password
          onChangeText={(data) => handleChange("password", data)}
          onBlur={() =>
            validateField("password", values.password, validateEmptyField)
          }
          label="Senha"
          placeholder="**********"
          value={values.password}
          errorMessage={error.field === "password" ? error.message : undefined}
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
    </ScreenWrapper>
  );
};

export default LoginScreen;
