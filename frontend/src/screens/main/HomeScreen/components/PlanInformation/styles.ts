import { Platform, StyleSheet } from "react-native";
import { fonts } from "../../../../../styles/fonts";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  titleThin: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoLight,
    color: colors.text.primary,
    marginBottom: 8,
  },
  titleRegular: {
    fontFamily: fonts.robotoRegular,
  },
  targetCalorie: {
    borderRadius: 8,
    height: 48,
    borderWidth: 3,
    borderColor: colors.secondary,
    justifyContent: "center",
    backgroundColor: colors.background.secondary,
    shadowColor: colors.common.black,
    ...(Platform.OS === "android"
      ? {
          elevation: 2,
        }
      : {
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
          shadowOpacity: 0.25,
        }),
  },
  targetCalorieText: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
    textAlign: "center",
  },
  adjustGoalButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  adjustGoalText: {
    textAlign: "auto",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: fonts.robotoLight,
    color: colors.blue,
  },
});
