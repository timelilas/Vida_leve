import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from './style/EmailSenha.style';

interface EmailSenhaProps {
  comparePassword: boolean;
  setComparePassword: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean; // Adiciona a prop isLogin
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailSenha: React.FC<EmailSenhaProps> = ({ comparePassword, setComparePassword, isLogin }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordVisible2, setPasswordVisible2] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Verifica a comparação de senhas apenas no cadastro
  useEffect(() => {
    if (!isLogin) {
      setComparePassword(password === confirmPassword); // Atualiza a comparação somente se não for login
    }
  }, [password, confirmPassword, isLogin]);

  return (
    <View style={styles.container}>
      {!isLogin && ( // Exibe nome apenas no cadastro
        <>
          <Text>Nome</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Seu nome"
            value={name}
            onChangeText={setName}
          />
        </>
      )}

      <Text style={styles.text}>Endereço de e-mail</Text>
      <TextInput 
        style={styles.textInput}
        placeholder="Joao@email.com"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.text}>Senha</Text>
      <View style={styles.containerInput}>
        <TextInput 
          textContentType="password"
          secureTextEntry={!isPasswordVisible}
          style={[styles.textInput, { flex: 1 }]}
          placeholder="*************"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
          <Image 
            source={require('../assets/Eyeoff.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {!isLogin && ( // Confirmação de senha apenas no cadastro
        <>
          <Text>Confirme sua senha</Text>
          <View style={styles.containerInput}>
            <TextInput 
              textContentType="password"
              secureTextEntry={!isPasswordVisible2}
              style={[styles.textInput, { flex: 1 }]}
              placeholder="*************"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible2(!isPasswordVisible2)}>
              <Image 
                source={require('../assets/Eyeoff.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {confirmPassword && !comparePassword && (
            <Text style={styles.errorText}>As senhas não coincidem</Text>
          )}
        </>
      )}
    </View>
  );
};

export default EmailSenha;
