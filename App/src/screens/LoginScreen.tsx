import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Logo from '../components/Logo';
import EmailSenha from '../components/EmailSenha';
import styles from './style/LoginScreen.style';
import { Link } from '@react-navigation/native';

const LoginScreen = () =>{
    return(
        <View style={styles.container}>
            <Logo />
            <View style={styles.inputs}>
              <Text>
                  Boas vindas!
              </Text>
              <Text>
                  Cadastre-se para continuar
              </Text>
              <EmailSenha />
            </View>
            <TouchableOpacity style={styles.button} 
            >
              <Text style={styles.buttonText}>Já tenho uma conta</Text>
            </TouchableOpacity>
        </View>
    )
};

export default LoginScreen;