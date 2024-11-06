import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { LogoSVG } from "../../components/Logo";
import styles from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { SubmitButton } from "../../components/buttons/SubmitButton";

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LogoSVG style={styles.logo} />
        <Text style={styles.title}>
          Boas vindas! {"\n"}
          Entre em sua conta para continuar
        </Text>
        <View style={styles.form}>
          <Input
            autoFocus
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
        </View>
        <SubmitButton
          style={styles.button}
          title="Continuar"
          type="primary"
          onPress={() => navigation.navigate("Onboarding/Goals")}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default LoginScreen;
