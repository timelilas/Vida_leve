import React from 'react';
import { View, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import styles from './style/EmailSenha.style';

const EmailSenha = () => {
    return(
        <View style={styles.container}>
          <Text>Endereço de e-mail</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="Joao@email.com"
          />
          <Text>Senha</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="*************"
          />
        </View>
    )
}

export default EmailSenha