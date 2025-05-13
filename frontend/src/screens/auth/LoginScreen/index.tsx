import { useRef } from "react";
import { View, ScrollView } from "react-native";
import { LogoSVG } from "../../../components/Logos/LogoSVG";
import { Input } from "../../../components/Input";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { SubmitButton } from "../../../components/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { httpAuthService } from "../../../services/auth";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { LoginFormData } from "./types";
import { maskEmail } from "../../../utils/masks";
import { HttpError } from "../../../@core/errors/httpError";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { wrongCredentialsMessage } from "./utils";
import { SecureStorage } from "../../../services/secureStorage/SecureStorage";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { STORAGE_ACCESS_TOKEN } from "../../../constants/localStorageConstants";
import { useNavigationAfterLogin } from "./hooks/useNavigationAfterLogin";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { zodLoginSchema } from "./schema";
import { Controller, useForm } from "react-hook-form";
import { customZodResolver } from "../../../libs/zod/@shared/resolver";
import { delay } from "../../../utils/helpers";
import { useUser } from "../../../hooks/user/useUser";
import { useProgress } from "../../../hooks/progress/useProgress";
import styles from "../styles";
import { useCaloriePlans } from "../../../hooks/caloriePlan/useCaloriePlans";

const loginInitialState: LoginFormData = { email: "", password: "" };

const LoginScreen = () => {
  const navigation = useAppNavigation();
  const scrollRef = useRef<ScrollView | null>(null);
  const { getUserProfile } = useUser({ enabled: false });
  const { getProgress } = useProgress({ enabled: false });
  const { getPlans } = useCaloriePlans({ enabled: false });

  const { Snackbar, showSnackbar } = useSnackbar();
  const {
    naivgateToHome,
    navigateToProfileForm,
    navigateToProgressForm,
    navigateToPlanSelection
  } = useNavigationAfterLogin();

  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    setError,
    trigger,
    clearErrors
  } = useForm<LoginFormData>({
    criteriaMode: "firstError",
    values: loginInitialState,
    resolver: customZodResolver(zodLoginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  const firstFieldError = Object.entries(errors).at(0);

  function goBack() {
    navigation.goBack();
  }

  function scrollToTop() {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  function revalidateFields(fields?: (keyof LoginFormData)[]) {
    trigger(fields);
  }

  function clearErrorsWithDelay(fields?: (keyof LoginFormData)[]) {
    delay(100).then(() => clearErrors(fields));
  }

  function handleApiError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    if (error instanceof HttpError && error.field) {
      if (error.status === 401) scrollToTop();
      const field = error.status === 401 ? "root" : error.field;
      const message = error.status === 401 ? wrongCredentialsMessage : error.message;
      return setError(field as any, { message });
    }
    showSnackbar({
      duration: 5000,
      message: error.message,
      variant: "error"
    });
  }

  async function handleNavigationAfterLogin() {
    try {
      const { user, progress, plans } = await setOnboardingData();

      if (!user?.birthDate || !user?.gender || !user?.phone || !user?.name) {
        return navigateToProfileForm();
      }
      if (!progress || !plans.length) {
        return navigateToProgressForm();
      }
      if (!progress.currentCaloriePlan) {
        return navigateToPlanSelection(plans);
      }

      return naivgateToHome();
    } catch (error) {
      console.log(error);
    }
  }

  async function setOnboardingData() {
    const [user, progress, plans] = await Promise.all([
      getUserProfile(),
      getProgress(),
      getPlans()
    ]);
    return { user, progress, plans };
  }

  async function onSubmit(params: LoginFormData) {
    try {
      const { data } = await httpAuthService.login(params);
      await SecureStorage.setItem(STORAGE_ACCESS_TOKEN, data.token);
      await handleNavigationAfterLogin();
    } catch (error: any) {
      handleApiError(error);
    }
  }

  return (
    <ScreenWrapper ref={scrollRef} snackbar={<Snackbar />}>
      <NavigationHeader variant="default" onBack={goBack} />
      <LogoSVG style={styles.logo} />
      {errors.root?.message && (
        <ErrorMessage style={styles.error} message={errors.root.message} />
      )}
      <ScreenTitle
        style={styles.title}
        title={`Boas vindas!\nEntre em sua conta para continuar`}
      />
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, name }, fieldState }) => {
            const isEmailError = firstFieldError?.at(0) === name;
            const isRootError = firstFieldError?.at(0) === "root";
            const isInvalid = fieldState.invalid;
            return (
              <Input
                onChangeText={(text) => onChange(maskEmail(text))}
                onBlur={() => revalidateFields(["email"])}
                onFocus={() => isInvalid && clearErrorsWithDelay(["password"])}
                label="E-mail"
                placeholder="Ex: joaodasilva@email.com"
                textContentType="emailAddress"
                errorMessage={isEmailError ? firstFieldError[1]?.message : undefined}
                error={isEmailError || isRootError}
                value={value}
                disabled={isSubmitting}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, name } }) => {
            const isPasswordError = firstFieldError?.at(0) === name;
            const isRootError = firstFieldError?.at(0) === "root";
            return (
              <Input.Password
                onChangeText={onChange}
                onBlur={() => revalidateFields()}
                label="Senha"
                placeholder="**********"
                value={value}
                errorMessage={isPasswordError ? firstFieldError[1]?.message : undefined}
                error={isPasswordError || isRootError}
                disabled={isSubmitting}
              />
            );
          }}
        />
      </View>
      <SubmitButton
        disabled={isSubmitting}
        style={styles.button}
        title="Continuar"
        type="primary"
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenWrapper>
  );
};

export default LoginScreen;
