import { Platform, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  button: {
    overflow: "hidden",
    padding: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.text.primary
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonSelectedDisabled: {
    backgroundColor: colors.background.secondary,
    padding: 0,
    borderWidth: 3,
    opacity: 0.7
  },
  buttonRounded: {
    borderRadius: 18
  },
  buttonSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    borderRadius: 10,
    shadowColor: colors.common.black,
    ...(Platform.OS === "android"
      ? {
          elevation: 4
        }
      : {
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
          shadowOpacity: 0.25
        })
  },
  container: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8
  },
  containerRounded: {
    borderRadius: 16
  }
});
