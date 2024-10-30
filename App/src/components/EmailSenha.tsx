import React from 'react';
import { View, TouchableOpacity, Text, Image, TextInput } from 'react-native';

const EmailSenha = () => {
    return(
        <View>
          <Text>Endereço de e-mail</Text>
          <TextInput 
            // style={styles.input}
            placeholder="Digite seu email"
          />
        </View>
    )
}

export default EmailSenha