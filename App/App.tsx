import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  // Função que será chamada ao clicar no botão
  const handleButtonPress = (buttonName: string) => {
    Alert.alert(`Você pressionou: ${buttonName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Meu App!</Text>
      <Text style={styles.subtitle}>Escolha uma opção abaixo:</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleButtonPress('Botão 1')}
        >
          <Text style={styles.buttonText}>Botão 1</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleButtonPress('Botão 2')}
        >
          <Text style={styles.buttonText}>Botão 2</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleButtonPress('Botão 3')}
        >
          <Text style={styles.buttonText}>Botão 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // cor de fundo suave
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200ea', // cor de fundo do botão
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%', // largura do botão
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // cor do texto do botão
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
