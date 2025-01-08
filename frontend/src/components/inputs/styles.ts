import { StyleSheet } from "react-native";

export const defaultInputStyles = StyleSheet.create({
  inputField: {
    gap: 8,
  },
  wrapper: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  boxShadow: {
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F7F7FC",
    padding: 1,
    height: 48,
    flex: 1,
  },
  boxShadowDisabled: {
    borderColor: "#B0AFB4",
    backgroundColor: "#f5f5f5",
  },
  boxShadowEmpty: {
    borderColor: "#f5f5f5",
    backgroundColor: "#f5f5f5",
  },
  boxShadowFilled: {
    borderColor: "#4E4B66",
  },
  boxShadowError: {
    borderColor: "#F95D4D",
    borderRadius: 10,
    backgroundColor: "#F95D4D",
  },
  inputBox: {
    backgroundColor: "#F7F7FC",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: "100%",
  },
  inputBoxDisabled: {
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
    color: "#4E4B66",
  },
  input: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    color: "#242424",
    paddingHorizontal: 16,
    borderRadius: 8,
    height: "100%",
    width: "100%",
    flexShrink: 1,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  errorIcon: {
    flexShrink: 0,
  },
});
