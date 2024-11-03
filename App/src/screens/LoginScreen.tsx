import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Logo from '../components/Logo';
import EmailSenha from '../components/EmailSenha';
import styles from './style/LoginScreen.style';
import { Link } from '@react-navigation/native';

const LoginScreen = () =>{
    return(
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.inputs}>
              <Logo />
              <Text style={styles.text}>
                  Boas vindas! {"\n"}
                  Entre em sua conta para continuar      
              </Text>
              <EmailSenha />
            </View>
            <TouchableOpacity style={styles.button} 
            >
              <Text style={styles.buttonText}>Já tenho uma conta</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    )
};

export default LoginScreen;