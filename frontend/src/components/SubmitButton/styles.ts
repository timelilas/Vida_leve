import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  base: {
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4e4b66",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  baseDisabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: "#ffae31",
  },
  outlined: {
    backgroundColor: "#f7f7fc",
  },
  highlighted: {
    backgroundColor: "#f7f7fc",
    borderWidth: 2,
    borderColor: "#FFAE31",
    paddingVertical: 14,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
});
