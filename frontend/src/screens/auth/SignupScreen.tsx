import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { LogoSVG } from "../../components/Logo";
import styles from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { SubmitButton } from "../../components/buttons/SubmitButton";

const SignupScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LogoSVG style={styles.logo} />
        <Text style={styles.title}>
          Boas vindas! {"\n"}
          Cadastre-se para continuar
        </Text>
        <View style={styles.form}>
          <Input
            autoFocus
            textContentType="name"
            value={name}
            onChange={(data) => setName(data)}
            name="Name"
            placeholder="Aryela"
          />
          <Input
            textContentType="emailAddress"
            value={email}
            onChange={(data) => setEmail(data)}
            name="Email"
            placeholder="aryela.scostaux@gmail.com"
          />
          <PasswordInput
            value={password}
            onChange={(data) => setPassword(data)}
            name="Senha"
            placeholder="**********"
          />
          <PasswordInput
            value={passwordConfirmation}
            onChange={(data) => setPasswordConfirmation(data)}
            name="Confirme sua senha"
            placeholder="**********"
          />
        </View>
        <SubmitButton
          style={styles.button}
          title="Continuar"
          type="primary"
          onPress={() => navigation.navigate("Login")}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SignupScreen;
