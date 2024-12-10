import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { HorizontalLogoSVG } from "./logos/HorizontalLogoSVG";
import { HeaderNavigator } from "./HeaderNavigator";

interface ScreenHeaderProps {
  onGoBack?: () => void;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ScreenHeader(props: ScreenHeaderProps) {
  return (
    <View style={[styles.headerContainer, props.style]}>
      <HeaderNavigator onGoBack={props.onGoBack} onClose={props.onClose} />
      <HorizontalLogoSVG />
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
  },
});
