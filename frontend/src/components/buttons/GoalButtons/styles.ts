import { StyleSheet, useWindowDimensions } from "react-native";

export function useGoalButtonStyles() {
  const screen = useWindowDimensions();

  return StyleSheet.create({
    contentContainer: {
      flexDirection: screen.width >= 430 ? "row" : "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: screen.width >= 430 ? 0 : 8,
      paddingVertical: 14,
      paddingHorizontal: 6,
    },
    titleContainer: {
      flexDirection: screen.width >= 300 ? "row" : "column",
      alignItems: "center",
      gap: 6,
    },
    subtitle: {
      width: "100%",
      fontSize: 16,
      lineHeight: 16,
      fontFamily: "Roboto-400",
      color: "#242424",
      textAlign: "center",
    },
    weekGoal: {
      alignItems: screen.width >= 430 ? "flex-end" : "center",
    },
    weekTarget: {
      fontSize: 24,
      color: "#242424",
      fontFamily: "Roboto-700",
      textAlign: "center",
    },
    weekPeriod: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily: "Roboto-300",
      color: "#242424",
      textAlign: "center",
    },
  });
}
