import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export function useAppFonts() {
  const [loaded, error] = useFonts({
    "Roboto-900": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-700": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-500": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-400": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-300": require("../assets/fonts/Roboto-Light.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return false;
  }

  return true;
}
