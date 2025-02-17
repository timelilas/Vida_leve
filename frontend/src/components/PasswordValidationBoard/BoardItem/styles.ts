import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  boardItem: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.robotoRegular,
    lineHeight: 19,
    color: colors.text.primary,
  },
  textValid: {
    color: colors.success,
  },
  textInvalid: {
    color: colors.error,
  },
});
