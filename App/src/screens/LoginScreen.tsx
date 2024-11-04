import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Logo from '../components/Logo';
import EmailSenha from '../components/EmailSenha';
import styles from './style/LoginScreen.style';

const LoginScreen = () => {
  const [comparePassword, setComparePassword] = useState(false);
  const [isLogin, setLogin] = useState(false); // Aqui deve ser true

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.inputs}>
          <Logo />
          <Text style={styles.text}>
            Boas vindas! {"\n"}
            Entre em sua conta para continuar 
          </Text>
          <EmailSenha
            comparePassword={comparePassword}
            setComparePassword={setComparePassword}
            isLogin={isLogin}
            setLogin={setLogin}
          />
        </View>
        <TouchableOpacity 
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
