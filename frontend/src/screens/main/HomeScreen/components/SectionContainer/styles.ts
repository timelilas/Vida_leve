import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    minHeight: 175,
    paddingHorizontal: 16,
    paddingBlock: 24,
    borderRadius: 16,
    justifyContent: "center",
    backgroundColor: colors.background.primary,
    shadowColor: colors.common.black,
    ...(Platform.OS === "android"
      ? {
          elevation: 8
        }
      : {
          shadowOffset: { width: 0, height: 8 },
          shadowRadius: 16,
          shadowOpacity: 0.25
        })
  }
});
