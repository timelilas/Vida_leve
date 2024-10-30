import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './style/Tela1Screen.styles';
import Logo from '../components/Logo';
import { NavigationProp } from '@react-navigation/native';

type Tela1ScreenProps = {
  navigation: NavigationProp<any>;
};

const Tela1Screen: React.FC<Tela1ScreenProps> = ({ navigation }) => {
  return (

    <View style={styles.container}>
      <Logo />
      <View>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text 
            style={styles.buttonText} 
            
          >Começar agora</Text>
        </TouchableOpacity>
        <br />
        <TouchableOpacity style={styles.button} 
        >
          <Text style={styles.buttonText2}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tela1Screen;
