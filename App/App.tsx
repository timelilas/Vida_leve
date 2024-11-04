import React from "react";
import Navigation from "./src/Navigation";
import * as SplashScreen from "expo-splash-screen";
import "@expo/metro-runtime";
import { useAppFonts } from "./src/hooks/useAppFonts";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return <Navigation />;
};

export default App;
