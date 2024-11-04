import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import styles from './style/EmailSenha.style';
import { EyeOffIcon } from "./icons/EyeOffIcon";

interface EmailSenhaProps {
  comparePassword: boolean;
  setComparePassword: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean; // Adiciona a prop isLogin
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailSenha: React.FC<EmailSenhaProps> = ({
  comparePassword,
  setComparePassword,
  isLogin,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordVisible2, setPasswordVisible2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Verifica a comparação de senhas apenas no cadastro
  useEffect(() => {
    if (isLogin) {
      setComparePassword(password === confirmPassword); // Atualiza a comparação somente se não for login
    }
  }, [password, confirmPassword, isLogin]);

  return (
    <View style={styles.form}>
      <View style={styles.inputField}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Joao@email.com"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.label}>Senha</Text>
        <View>
          <TextInput
            style={[styles.input, styles.inputPassword]}
            placeholder="*************"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPasswordVisible2(!isPasswordVisible2)}
          >
            <EyeOffIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 24,
    width: "100%",
    marginBottom: 72,
  },
  inputField: {
    gap: 8,
  },
  label: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
  },
  input: {
    padding: 16,
    backgroundColor: "#F7F7FC",
    borderRadius: 8,
    borderColor: "#4E4B66",
    borderWidth: 1,
  },
  inputPassword: {
    paddingRight: 56,
  },
  button: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export default EmailSenha;

// <View style={styles.container}>
//   {isLogin && ( // Exibe nome apenas no cadastro
//     <View style={styles.containerEmailPassword}>
//       <Text>Nome</Text>
//       <TextInput
//         style={styles.textInput}
//         placeholder="Seu nome"
//         value={name}
//         onChangeText={setName}
//       />
//     </View>
//   )}

//   <Text style={styles.text}>Endereço de e-mail</Text>
//   <TextInput
//     style={styles.textInput}
//     placeholder="Joao@email.com"
//     value={email}
//     onChangeText={setEmail}
//   />

//   <Text style={styles.text}>Senha</Text>
//   <View style={styles.containerInput}>
//     <TextInput
//       textContentType="password"
//       secureTextEntry={!isPasswordVisible}
//       style={[styles.textInput, { flex: 1 }]}
//       placeholder="*************"
//       value={password}
//       onChangeText={setPassword}
//     />
//     <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
//       <View style={styles.icon}>
//         <EyeOffIcon/>
//       </View>
//     </TouchableOpacity>
//   </View>

//   {isLogin && ( // Confirmação de senha apenas no cadastro
//     <View style={styles.containerEmailPassword}>
//       <Text>Confirme sua senha</Text>
//       <View style={styles.containerInput}>
//         <TextInput
//           textContentType="password"
//           secureTextEntry={!isPasswordVisible2}
//           style={[styles.textInput, { flex: 1 }]}
//           placeholder="*************"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//         />
//         <TouchableOpacity onPress={() => setPasswordVisible2(!isPasswordVisible2)}>
//           <View style={styles.icon}>
//             <EyeOffIcon/>
//           </View>
//         </TouchableOpacity>
//       </View>
//       {confirmPassword && !comparePassword && (
//         <Text style={styles.errorText}>As senhas não coincidem</Text>
//       )}
//     </View>
//   )}
// </View>
