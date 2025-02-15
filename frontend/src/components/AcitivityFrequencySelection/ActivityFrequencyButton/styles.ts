import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 14,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto-300",
    color: "#4E4B66",
  },
  descriptionHidden: {
    overflow: "hidden",
    maxHeight: 0,
  },
  disabled: {
    opacity: 0.5,
  },
});
