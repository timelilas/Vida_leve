import React from "react";
import Navigation from "./src/routes/Navigation";
import * as SplashScreen from "expo-splash-screen";
import { useAppFonts } from "./src/hooks/useAppFonts";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/libs/react-query/queryClient";
import "@expo/metro-runtime";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs(true);

const App = () => {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
