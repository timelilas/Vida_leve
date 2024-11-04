import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import styles from './style/EmailSenha.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmailSenha = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

    return(
        <View style={styles.container}>
          <Text 
            style={styles.text}
          >Endereço de e-mail</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="Joao@email.com"
          />
          <Text
            style={styles.text}
          >Senha</Text>
          <View style={styles.containerInput}>
            <TextInput 
              textContentType="password"
              secureTextEntry={!isPasswordVisible}
              style={[styles.textInput, { flex: 1 }]}
              placeholder="*************"
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Image 
              source={require('../assets/Eyeoff.png')}
              style={styles.icon}
            />
            </TouchableOpacity>
          </View>
        </View>
    )
}

export default EmailSenha