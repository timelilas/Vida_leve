import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from './style/EmailSenha.style';
import { EyeOffIcon } from "./icons/EyeOffIcon";

interface EmailSenhaProps {
  comparePassword: boolean;
  setComparePassword: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean; // Adiciona a prop isLogin
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailSenha: React.FC<EmailSenhaProps> = ({
  comparePassword,
  setComparePassword,
  isLogin,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordVisible2, setPasswordVisible2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Verifica a comparação de senhas apenas no cadastro
  useEffect(() => {
    if (isLogin) {
      setComparePassword(password === confirmPassword); // Atualiza a comparação somente se não for login
    }
  }, [password, confirmPassword, isLogin]);

  return (
    <View style={styles.form}>
      {
        isLogin && (
          <View style={styles.inputField}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
            />
          </View>
        )
      }
      <View style={styles.inputField}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Joao@email.com"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.label}>Senha</Text>
        <View>
          <TextInput
            style={[styles.input, styles.inputPassword]}
            textContentType="password"
            secureTextEntry={!isPasswordVisible}
            placeholder="*************"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPasswordVisible2(!isPasswordVisible2)}
          >
            <EyeOffIcon />
          </TouchableOpacity>
          {
            isLogin && (
              <View style={styles.inputField}>
                <Text style={styles.label}>Confirme sua senha</Text>
                <View>
                  <TextInput
                    textContentType="password"
                    secureTextEntry={!isPasswordVisible2}
                    style={[styles.input, styles.inputPassword]}
                    placeholder="*************"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setPasswordVisible2(!isPasswordVisible2)}
                  >
                    <EyeOffIcon />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        </View>
        {confirmPassword && !comparePassword && (
          <Text style={styles.errorText}>As senhas não coincidem</Text>
        )}
      </View>
    </View>
  );
};



export default EmailSenha;