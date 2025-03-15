import { StyleSheet } from "react-native";
import { fonts } from "../../../../../styles/fonts";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBlock: 14,
    paddingInline: 6,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
  },
  caloriesText: {
    fontSize: 16,
    lineHeight: 16,
    color: colors.primary,
    fontFamily: fonts.robotoRegular,
    marginLeft: "auto",
    marginRight: 24,
  },
});
