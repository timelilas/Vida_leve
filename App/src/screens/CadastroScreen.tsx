import React, { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { LogoSVG } from "../components/Logo";
import EmailSenha from "../components/EmailSenha";
import styles from "./style/LoginScreen.style";

const Cadastro = () => {
  const [comparePassword, setComparePassword] = useState(false);
  const [isLogin, setLogin] = useState(true); // Aqui deve ser false

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.inputs}>
          <LogoSVG style={styles.logo} />
          <Text style={styles.text}>
            Boas vindas! {"\n"}
            Cadastre-se para continuar
          </Text>
          <EmailSenha
            isLogin={isLogin}
            setLogin={setLogin}
            comparePassword={comparePassword}
            setComparePassword={setComparePassword}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={!comparePassword} // Desabilita se as senhas não coincidirem
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Cadastro;
