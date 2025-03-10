import React, { useEffect, useState } from "react";
import AppRouter from "./src/routes/AppRouter";
import * as SplashScreen from "expo-splash-screen";
import { useAppFonts } from "./src/hooks/common/useAppFonts";
import { LogBox, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/libs/react-query/queryClient";
import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import "@expo/metro-runtime";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs(true);

const App = () => {
  const { isFontsLoaded, error } = useAppFonts();
  const [isSkiaLoaded, setIsSkiaLoaded] = useState(false);

  useEffect(() => {
    if (isFontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded, error]);

  //Loading skia .wasm file to enable skia canvas on web
  useEffect(() => {
    if (Platform.OS === "web") {
      LoadSkiaWeb({
        locateFile: () => "/canvaskit.wasm",
      }).then(() => setIsSkiaLoaded(true));
    } else {
      setIsSkiaLoaded(true);
    }
  }, []);

  if (!isFontsLoaded || !isSkiaLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
