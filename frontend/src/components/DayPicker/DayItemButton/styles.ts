import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBlock: 8,
    width: 96,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto-300",
    color: "#242424",
  },
  textDisabled: {
    color: "#868686",
  },
  containerDisabled: {
    opacity: 0.5,
  },
});
