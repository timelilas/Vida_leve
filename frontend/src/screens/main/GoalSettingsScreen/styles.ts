import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  body: {
    gap: 32,
  },
  contentContainer: {
    gap: 8,
  },
  buttonWrapper: {
    gap: 16,
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 14,
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
  },
  textDivider: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: fonts.robotoBold,
    textAlign: "center",
    color: colors.text.primary,
  },
});
