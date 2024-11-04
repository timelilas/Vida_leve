import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Logo from '../components/Logo';
import EmailSenha from '../components/EmailSenha';
import styles from './style/LoginScreen.style';
import { Link } from '@react-navigation/native';

const LoginScreen = () => {
  const [comparePassword, setComparePassword] = useState(false);

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
          />
        </View>
        <TouchableOpacity 
          style={ styles.button}
          disabled={!comparePassword}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
