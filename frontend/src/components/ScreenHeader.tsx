import { View, StyleSheet } from "react-native";
import { HorizontalLogoSVG } from "./logos/HorizontalLogoSVG";
import { HeaderNavigator } from "./HeaderNavigator";

interface ScreenHeaderProps {
  onGoBack?: () => void;
  onClose?: () => void;
}

export function ScreenHeader({ onGoBack, onClose }: ScreenHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <HeaderNavigator onGoBack={onGoBack} onClose={onClose} />
      <HorizontalLogoSVG />
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
  },
});
