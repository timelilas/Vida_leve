import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-300",
    color: "#4e4b66",
  },
  calorieProgress: {
    padding: 10,
    gap: 10,
  },
  foodIconsWrapper: {
    gap: 32,
    rowGap: 16,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    textAlign: "auto",
    fontSize: 14,
    fontFamily: "Roboto-300",
    color: "#0000FF",
  },
});
