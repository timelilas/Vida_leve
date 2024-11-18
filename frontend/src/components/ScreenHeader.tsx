import { NavigationProp } from "@react-navigation/native";
import {
  Pressable,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

import { ArrowIcon } from "./icons/ArrowIcon";
import { HorizontalLogoSVG } from "./logos/HorizontalLogoSVG";

interface ScreenHeaderProps {
  navigation: NavigationProp<any>;
  style?: StyleProp<ViewStyle>;
}

export function ScreenHeader({ navigation, style }: ScreenHeaderProps) {
  return (
    <View style={[styles.headerContainer, style]}>
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={4}
        style={styles.goBackButton}
      >
        <ArrowIcon />
      </Pressable>
      <HorizontalLogoSVG />
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  goBackButton: {
    position: "absolute",
    borderRadius: 24 / 2,
    left: 0,
    top: "50%",
    transform: [{ translateY: -24 / 2 }],
  },
});
