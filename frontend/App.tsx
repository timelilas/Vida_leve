import React from "react";
import Navigation from "./src/routes/Navigation";
import * as SplashScreen from "expo-splash-screen";
import "@expo/metro-runtime";
import { useAppFonts } from "./src/hooks/useAppFonts";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs(true);

const App = () => {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
