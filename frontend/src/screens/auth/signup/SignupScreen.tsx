import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { LogoSVG } from "../../../components/logos/LogoSVG";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { Input } from "../../../components/inputs/Input";
import { PasswordInput } from "../../../components/inputs/PasswordInput";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { validateEmail } from "../../../utils/validations/email";
import { validatePassword } from "../../../utils/validations/password";
import { validatePasswordConfirmation } from "../../../utils/validations/passwordConfirmation";
import { SignupFormData } from "./types";
import styles from "../styles";
import { maskEmail } from "../../../utils/masks";
import { HeaderNavigator } from "../../../components/HeaderNavigator";
import { useForm } from "../../../hooks/useForm";
import { httpAuthService } from "../../../services/auth";
import { StackActions } from "@react-navigation/native";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { HttpError } from "../../../@core/errors/httpError";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";

const signupFormInitialState: SignupFormData = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignupScreen = () => {
  const navigation = useAppNavigation();
  const scrollRef = useRef<ScrollView>(null);
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

  function scrollToTop() {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  function handleUnexpectedError() {
    scrollToTop();
    setError({ message: UNEXPECTED_ERROR_MESSAGE });
  }

  async function handleSubmit() {
    if (!validateAllFields()) return;
    await httpAuthService.signup(values);
    return navigation.dispatch(StackActions.replace(RouteConstants.Login));
  }

  function handleError(error: Error) {
    if (error instanceof HttpError) {
      !error.field && scrollToTop();
      return setError({ field: error.field as any, message: error.message });
    }
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    handleUnexpectedError();
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
    <ScreenWrapper scrollable ref={scrollRef}>
      <View style={styles.container}>
        <HeaderNavigator style={styles.headerNavigator} onGoBack={goBack} />
        <LogoSVG style={styles.logo} />
        {error.message && !error.field && (
          <ErrorMessage style={styles.error} message={error.message} />
        )}
        <ScreenTitle
          style={styles.title}
          title={`Boas vindas!\nCadastre-se para continuar`}
        />
        <View style={styles.form}>
          <Input
            onBlur={() => validateField("email", values.email, validateEmail)}
            onChange={(value) => handleChange("email", maskEmail(value))}
            disabled={isSubmitting}
            autoFocus
            name="email"
            label="E-mail"
            textContentType="emailAddress"
            placeholder="Ex.: joaodasilva@email.com"
            value={values.email}
            error={error.field === "email"}
            errorMessage={error.field === "email" ? error.message : undefined}
          />
          <PasswordInput
            onChange={handlePasswordChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() =>
              validateField("password", values.password, validatePassword)
            }
            name="password"
            label="Senha"
            placeholder="**********"
            value={values.password}
            disabled={isSubmitting}
            withBoard={passwordFocused}
            enableBoard={isTypingPassword || error.field === "password"}
            error={error.field === "password"}
          />
          <PasswordInput
            onChange={(value) => handleChange("passwordConfirmation", value)}
            onBlur={handlePasswordConfirmationValidation}
            name="passwordConfirmation"
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
