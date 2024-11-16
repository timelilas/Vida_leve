import { useRef } from "react";
import { View, ScrollView } from "react-native";
import { LogoSVG } from "../../../components/logos/LogoSVG";
import { CommonActions, NavigationProp } from "@react-navigation/native";
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
import styles from "../styles";

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const loginInitialState = {
  email: "",
  password: "",
};

export default function LoginScreen(props: LoginScreenProps) {
  const scrollRef = useRef<ScrollView | null>(null);
  const { data, handleChange, setIsLoading, setError, validateField } =
    useForm(loginInitialState);
  const { values, error, isLoading } = data;

  async function login() {
    if (!validateAllFields()) return;

    setError({});
    setIsLoading(true);
    const result = await httpAuthService.login(values);

    if (!result.success) {
      const field = result.error.field || undefined;
      setIsLoading(false);
      setError({ message: result.error.message, field: field as any });
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      props.navigation.dispatch(
        CommonActions.reset({ routes: [{ name: "Onboarding/ProfileForm" }] })
      );
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
    <ScreenWrapper>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <LogoSVG style={styles.logo} />
        {error.message && (
          <ErrorMessage style={styles.error} message={error.message} />
        )}
        <ScreenTitle
          style={styles.title}
          title={`Boas vindas!\nEntre em sua conta para continuar`}
        />
        <View style={styles.form}>
          <Input
            onChange={(data) => handleChange("email", data)}
            onBlur={() => validateField("email", values.email, validateEmail)}
            filled={values.email.length > 0}
            disabled={isLoading}
            error={error.field === "email"}
            textContentType="emailAddress"
            value={values.email}
            name="email"
            label="E-mail"
            placeholder="aryela.scostaux@gmail.com"
            autoFocus
          />
          <PasswordInput
            onChange={(data) => handleChange("password", data)}
            onBlur={() =>
              validateField("password", values.password, validateEmptyField)
            }
            filled={values.password.length > 0}
            disabled={isLoading}
            error={error.field === "password"}
            value={values.password}
            name="password"
            label="Senha"
            placeholder="**********"
          />
        </View>
        <SubmitButton
          disabled={isLoading}
          style={styles.button}
          title="Continuar"
          type="primary"
          onPress={login}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}
