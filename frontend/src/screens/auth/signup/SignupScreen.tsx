import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { LogoSVG } from "../../../components/logos/LogoSVG";
import { NavigationProp } from "@react-navigation/native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { Input } from "../../../components/inputs/Input";
import { PasswordInput } from "../../../components/inputs/PasswordInput";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { validateEmail } from "../../../utils/validations/email";
import { validatePassword } from "../../../utils/validations/password";
import { validatePasswordConfirmation } from "../../../utils/validations/passwordConfirmation";
import { useSignupForm } from "./useSignupForm";
import styles from "../styles";

type SignupScreenProps = {
  navigation: NavigationProp<any>;
};

const SignupScreen = (props: SignupScreenProps) => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const { values, error, isLoading, ref, handleChange, signup, validateField } =
    useSignupForm({ navigation: props.navigation });

  function handlePasswordConfirmationValidation() {
    if (validatePassword(values.password).success) {
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

  return (
    <ScreenWrapper>
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
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
            onChange={(value) => handleChange("email", value)}
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
            error={error.field === "passwordConfirmation"}
            errorMessage={
              error.field === "passwordConfirmation" ? error.message : undefined
            }
          />
        </View>
        <SubmitButton
          disabled={isLoading}
          style={styles.button}
          title="Continuar"
          type="primary"
          onPress={signup}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SignupScreen;
