import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  contentWrapper: {
    flexShrink: 1,
    gap: 8,
  },
  title: {
    fontFamily: "Roboto-700",
    fontSize: 20,
    lineHeight: 20,
    color: "#242424",
  },
  description: {
    fontFamily: "Roboto-300",
    fontSize: 16,
    lineHeight: 16,
    color: "#242424",
  },
});
