import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { LogoSVG } from "../../components/Logo";
import styles from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { request } from "../../services/Request";
import { ScreenTitle } from "../../components/ScreenTitle";

const SignupScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const signup = async () => {
    try {
      const newUser = { userName: name, email, senha: password };
      const { data } = await request("POST", "/auth/signup", newUser);
      console.log(data);
      navigation.navigate("Login");
    } catch (error) {}
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LogoSVG style={styles.logo} />
        <ScreenTitle title={`Boas vindas!\nCadastre-se para continuar`} />
        <View style={styles.form}>
          <Input
            autoFocus
            textContentType="name"
            value={name}
            onChange={(data) => setName(data)}
            name="name"
            label="Nome"
            placeholder="Aryela"
          />
          <Input
            textContentType="emailAddress"
            value={email}
            onChange={(data) => setEmail(data)}
            name="email"
            label="Email"
            placeholder="aryela.scostaux@gmail.com"
          />
          <PasswordInput
            value={password}
            onChange={(data) => setPassword(data)}
            name="password"
            label="Senha"
            placeholder="**********"
          />
          <PasswordInput
            value={passwordConfirmation}
            onChange={(data) => setPasswordConfirmation(data)}
            name="passwordConfirmation"
            label="Confirme sua senha"
            placeholder="**********"
          />
        </View>
        <SubmitButton
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
