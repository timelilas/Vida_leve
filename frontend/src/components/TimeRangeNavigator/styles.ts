import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    height: 34,
  },
  labelContainer: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  label: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary,
  },
  rightIcon: {
    transform: [{ rotate: "180deg" }],
  },
  buttonDisabled: {
    opacity: 0.35,
  },
});
