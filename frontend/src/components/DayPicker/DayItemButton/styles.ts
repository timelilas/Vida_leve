import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    paddingBlock: 8,
    width: 96,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary,
  },
  textDisabled: {
    color: colors.text.disabled,
  },
  containerDisabled: {
    opacity: 0.5,
  },
});
