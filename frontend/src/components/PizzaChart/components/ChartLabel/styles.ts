import { StyleSheet } from "react-native";
import { fonts } from "../../../../styles/fonts";
import { colors } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    gap: 2,
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.robotoBold,
    color: colors.common.black,
    fontSize: 16,
    lineHeight: 16,
  },
  subtitle: {
    fontFamily: fonts.robotoRegular,
    color: colors.common.black,
    fontSize: 14,
    lineHeight: 14,
  },
});
