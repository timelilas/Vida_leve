import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

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
    backgroundColor: colors.background.secondary,
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
    borderColor: colors.text.primary,
  },
  boxShadowError: {
    borderColor: colors.error,
    borderRadius: 10,
    backgroundColor: colors.error,
  },
  inputBox: {
    backgroundColor: colors.background.secondary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: "100%",
  },
  inputBoxDisabled: {
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 16,
    color: colors.text.primary,
  },
  input: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    color: colors.text.secondary,
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
