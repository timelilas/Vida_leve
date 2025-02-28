import { useFonts } from "expo-font";

export function useAppFonts() {
  const [isFontsLoaded, error] = useFonts({
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Ruda-Bold": require("../assets/fonts/Ruda-Bold.ttf"),
  });

  return { isFontsLoaded, error };
}
