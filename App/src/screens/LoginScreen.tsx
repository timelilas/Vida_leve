import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import styles from './style/LoginScreen.styles';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_V2.png')} style={styles.logo} />
      <div>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Começar agora</Text>
        </TouchableOpacity>
        <br />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText2}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </div>
    </View>
  );
};

export default LoginScreen;
