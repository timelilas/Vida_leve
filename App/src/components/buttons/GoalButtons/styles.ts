import { StyleSheet, useWindowDimensions } from "react-native";

export function useGoalButtonStyles() {
  const screen = useWindowDimensions();

  return StyleSheet.create({
    contentContainer: {
      flexDirection: screen.width >= 430 ? "row" : "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: screen.width >= 430 ? 0 : 8,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    subtitle: {
      width: "100%",
      fontSize: 16,
      fontFamily: "Roboto-400",
      color: "#242424",
    },
    weekGoal: {
      alignItems: screen.width >= 430 ? "flex-end" : "center",
    },
    weekTarget: {
      fontSize: 24,
      lineHeight:28.8,
      color: "#242424",
      fontFamily: "Roboto-700",
    },
    weekPeriod: {
      fontSize: 14,
      fontFamily: "Roboto-300",
      color: "#242424",
    },
  });
}
