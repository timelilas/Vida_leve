import React, { useState } from "react";
import { View } from "react-native";
import { LogoSVG } from "../../../components/Logos/LogoSVG";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { Input } from "../../../components/Input";
import { SubmitButton } from "../../../components/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { validateEmail } from "../../../utils/validations/email";
import { validatePassword } from "../../../utils/validations/password";
import { validatePasswordConfirmation } from "../../../utils/validations/passwordConfirmation";
import { SignupFormData } from "./types";
import { maskEmail } from "../../../utils/masks";
import { useForm } from "../../../hooks/useForm";
import { httpAuthService } from "../../../services/auth";
import { StackActions } from "@react-navigation/native";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { HttpError } from "../../../@core/errors/httpError";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import styles from "../styles";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { NavigationHeader } from "../../../components/NavigationHeader";

const signupFormInitialState: SignupFormData = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignupScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const navigation = useAppNavigation();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const { data, handleChange, setError, validateField, onSubmit } = useForm({
    initialState: signupFormInitialState,
  });
  const { values, error, isSubmitting } = data;

  function handlePasswordConfirmationValidation() {
    const validPassword = validatePassword(values.password).success;
    if (validPassword) {
      const value = values.passwordConfirmation;
      validateField("passwordConfirmation", value, (value: any) =>
        validatePasswordConfirmation(values.password, value)
      );
    }
  }

  function handlePasswordChange(value: string) {
    handleChange("password", value);
    setIsTypingPassword(true);
    validateField("password", value, validatePassword);
  }

  async function handleSubmit() {
    if (!validateAllFields()) return;
    await httpAuthService.signup(values);
    return navigation.dispatch(StackActions.replace(RouteConstants.Login));
  }

  function handleError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    if (error instanceof HttpError) {
      setError({ field: error.field as any, message: error.message });
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
      password: validatePassword(values.password),
      passwordConfirmation: validatePasswordConfirmation(
        values.password,
        values.passwordConfirmation
      ),
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
    <ScreenWrapper snackbar={<Snackbar />}>
      <View style={styles.container}>
        <NavigationHeader variant="default" onBack={goBack} />
        <LogoSVG style={styles.logo} />
        <ScreenTitle
          style={styles.title}
          title={`Boas vindas!\nCadastre-se para continuar`}
        />
        <View style={styles.form}>
          <Input
            onBlur={() => validateField("email", values.email, validateEmail)}
            onChangeText={(value) => handleChange("email", maskEmail(value))}
            disabled={isSubmitting}
            autoFocus
            label="E-mail"
            textContentType="emailAddress"
            placeholder="Ex.: joaodasilva@email.com"
            value={values.email}
            error={error.field === "email"}
            errorMessage={error.field === "email" ? error.message : undefined}
          />
          <Input.Password
            onChangeText={handlePasswordChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() =>
              validateField("password", values.password, validatePassword)
            }
            label="Senha"
            placeholder="**********"
            value={values.password}
            disabled={isSubmitting}
            withBoard={passwordFocused}
            enableBoard={isTypingPassword || error.field === "password"}
            error={error.field === "password"}
          />
          <Input.Password
            onChangeText={(value) =>
              handleChange("passwordConfirmation", value)
            }
            onBlur={handlePasswordConfirmationValidation}
            label="Confirmar senha"
            placeholder="**********"
            value={values.passwordConfirmation}
            disabled={isSubmitting}
            error={error.field === "passwordConfirmation"}
            errorMessage={
              error.field === "passwordConfirmation" ? error.message : undefined
            }
          />
        </View>
        <SubmitButton
          disabled={isSubmitting}
          style={styles.button}
          title="Começar agora"
          type="primary"
          onPress={onSubmit(handleSubmit, handleError)}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SignupScreen;
