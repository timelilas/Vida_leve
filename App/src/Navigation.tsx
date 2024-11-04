import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tela1Screen from './screens/Tela1Screen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Vida Leve">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Tela1" 
          component={Tela1Screen} 
          options={{ headerShown: false }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
