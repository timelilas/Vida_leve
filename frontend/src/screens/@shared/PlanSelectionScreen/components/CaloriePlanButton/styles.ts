import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { fonts } from "../../../../../styles/fonts";
import { colors } from "../../../../../styles/colors";

export function useStyles() {
  const screen = useWindowDimensions();

  return StyleSheet.create({
    contentContainer: {
      flexDirection: screen.width >= 390 ? "row" : "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: screen.width >= 390 ? 0 : 8,
      paddingVertical: 14,
      paddingHorizontal: 6
    },
    titleContainer: {
      flexDirection: screen.width >= 240 ? "row" : "column",
      alignItems: "center",
      gap: 6
    },
    title: {
      width: "100%",
      fontSize: 16,
      lineHeight: 16,
      fontFamily: fonts.robotoRegular,
      color: colors.text.secondary,
      textAlign: "center"
    },
    goal: {
      alignItems: screen.width >= 390 ? "flex-end" : "center"
    },
    dailyCalories: {
      fontSize: 24,
      color: colors.text.secondary,
      fontFamily: fonts.robotoBold,
      textAlign: "center"
    },
    duration: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily: fonts.robotoLight,
      color: colors.text.secondary,
      textAlign: "center"
    },
    disabled: {
      opacity: 0.5
    }
  });
}
