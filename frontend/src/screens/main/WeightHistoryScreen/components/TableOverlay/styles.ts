import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.background.primary,
    opacity: 0.5
  },
  activityIndicator: {
    transform: [{ scale: 1.25 }]
  }
});
