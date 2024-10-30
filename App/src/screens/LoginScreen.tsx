import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Logo from '../components/Logo';
import EmailSenha from '../components/EmailSenha';
import styles from './style/LoginScreen.style';

const LoginScreen = () =>{
    return(
        <View style={styles.container}>
            <Logo />
            <EmailSenha />
        </View>
    )
};

export default LoginScreen;