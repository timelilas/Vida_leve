import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  base: {
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 48,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.text.primary,
    justifyContent: "center",
  },
  baseDisabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: colors.secondary,
  },
  outlined: {
    backgroundColor: colors.background.secondary,
  },
  highlighted: {
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
  },
});
