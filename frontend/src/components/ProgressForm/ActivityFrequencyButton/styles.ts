import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    padding: 13,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: fonts.robotoLight,
    color: colors.text.primary,
  },
  descriptionHidden: {
    overflow: "hidden",
    maxHeight: 0,
  },
  disabled: {
    opacity: 0.5,
  },
});
