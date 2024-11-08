import { useState } from "react";
import { View, ScrollView } from "react-native";
import { LogoSVG } from "../../components/Logo";
import styles from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { request } from "../../services/Request";
import { ScreenTitle } from "../../components/ScreenTitle";

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    try {
      if (email && password) {
        const user = { email, senha: password };
        const { data } = await request("POST", "/auth/login", user);
        console.log(data);
        navigation.navigate("Onboarding/Goals");
      } else {
        setError("Por favor, insira email e senha.");
      }
    } catch (AxiosError: any) {
      console.log(AxiosError.response.data.error);
      setError(AxiosError.response.data.error);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LogoSVG style={styles.logo} />
        <ScreenTitle
          title={`Boas vindas!\nEntre em sua conta para continuar`}
        />
        <View style={styles.form}>
          <Input
            error={!!error}
            autoFocus
            textContentType="emailAddress"
            value={email}
            onChange={(data) => setEmail(data)}
            name="email"
            label="Email"
            placeholder="aryela.scostaux@gmail.com"
          />
          <PasswordInput
            error={!!error}
            value={password}
            onChange={(data) => setPassword(data)}
            name="password"
            label="Senha"
            placeholder="**********"
          />
        </View>
        <SubmitButton
          style={styles.button}
          title="Continuar"
          type="primary"
          onPress={login}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default LoginScreen;
