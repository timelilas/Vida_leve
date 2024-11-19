import { StyleSheet, useWindowDimensions } from "react-native";

export function useCalendarHeaderStyles() {
  const { width } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flexDirection: width > 370 ? "row" : "column",
      justifyContent: "space-between",
      alignItems: width > 370 ? "center" : "center",
    },
    buttonWrapper: {
      gap: 4,
      alignItems: "center",
      flexDirection: "row",
    },
  });
}
