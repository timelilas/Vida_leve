import { StyleSheet } from "react-native";
import { fonts } from "../../../../../styles/fonts";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  contentWrapper: {
    flexShrink: 1,
    gap: 8,
  },
  title: {
    fontFamily: fonts.robotoBold,
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  description: {
    fontFamily: fonts.robotoLight,
    fontSize: 16,
    lineHeight: 16,
    color: colors.text.secondary,
  },
});
