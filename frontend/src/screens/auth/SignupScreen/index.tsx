import React, { useState } from "react";
import { View } from "react-native";
import { LogoSVG } from "../../../components/Logos/LogoSVG";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { Input } from "../../../components/Input";
import { SubmitButton } from "../../../components/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { SignupFormData } from "./types";
import { maskEmail } from "../../../utils/masks";
import { httpAuthService } from "../../../services/auth";
import { StackActions } from "@react-navigation/native";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { HttpError } from "../../../@core/errors/httpError";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { zodSignupSchema } from "./schema";
import { Controller, useForm } from "react-hook-form";
import styles from "../styles";
import { customZodResolver } from "../../../libs/zod/@shared/resolver";
import { delay } from "../../../utils/helpers";

const signupFormInitialState: SignupFormData = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignupScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const navigation = useAppNavigation();
  const [isPasswordBoardVisible, setIsPasswordBoardVisible] = useState(false);

  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    setError,
    trigger,
    clearErrors,
  } = useForm({
    criteriaMode: "firstError",
    values: signupFormInitialState,
    resolver: customZodResolver(zodSignupSchema),
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  const firstFieldError = Object.entries(errors).at(0);

  function goBack() {
    navigation.goBack();
  }

  function revalidateFields(fields?: (keyof SignupFormData)[]) {
    trigger(fields);
  }

  function handleApiError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    if (error instanceof HttpError && error.field) {
      return setError(error.field as any, { message: error.message });
    }
    showSnackbar({
      duration: 5000,
      message: error.message,
      variant: "error",
    });
  }

  function clearErrorsWithDelay(fields?: (keyof SignupFormData)[]) {
    delay(100).then(() => clearErrors(fields));
  }

  async function onSubmit(params: SignupFormData) {
    try {
      await httpAuthService.signup(params);
      return navigation.dispatch(StackActions.replace(RouteConstants.Login));
    } catch (error: any) {
      handleApiError(error);
    }
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <View style={styles.container}>
        <NavigationHeader variant="default" onBack={goBack} />
        <LogoSVG style={styles.logo} />
        <ScreenTitle
          style={styles.title}
          title={`Boas vindas!\nCadastre-se para continuar`}
        />
        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, name }, fieldState }) => {
              const isEmailError = firstFieldError?.at(0) === name;
              const isInvalid = fieldState.invalid;
              return (
                <Input
                  disabled={isSubmitting}
                  label="E-mail"
                  textContentType="emailAddress"
                  placeholder="Ex.: joaodasilva@email.com"
                  value={value}
                  error={isEmailError}
                  onBlur={() => revalidateFields(["email"])}
                  onChangeText={(text) => onChange(maskEmail(text))}
                  onFocus={() =>
                    isInvalid &&
                    clearErrorsWithDelay(["password", "passwordConfirmation"])
                  }
                  errorMessage={
                    isEmailError ? firstFieldError[1].message : undefined
                  }
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, name }, fieldState }) => {
              const isPasswordError = firstFieldError?.at(0) === name;
              const isInvalid = fieldState.invalid;
              return (
                <Input.Password
                  label="Senha"
                  placeholder="**********"
                  value={value}
                  disabled={isSubmitting}
                  withBoard={isPasswordBoardVisible}
                  error={isPasswordError}
                  enableBoard={fieldState.isDirty}
                  onBlur={() => revalidateFields(["email", "password"])}
                  onFocus={() => {
                    setIsPasswordBoardVisible(true);
                    isInvalid && clearErrorsWithDelay(["passwordConfirmation"]);
                  }}
                  onChangeText={(text) => {
                    onChange(text);
                    trigger(name);
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange, value, name } }) => {
              const isConfirmPasswordError = firstFieldError?.at(0) === name;
              return (
                <Input.Password
                  onBlur={() => revalidateFields()}
                  onChangeText={onChange}
                  label="Confirmar senha"
                  placeholder="**********"
                  value={value}
                  disabled={isSubmitting}
                  error={isConfirmPasswordError}
                  errorMessage={
                    isConfirmPasswordError
                      ? firstFieldError[1].message
                      : undefined
                  }
                />
              );
            }}
          />
        </View>
        <SubmitButton
          disabled={isSubmitting}
          style={styles.button}
          title="Começar agora"
          type="primary"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SignupScreen;
