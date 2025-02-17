import { StyleSheet } from "react-native";
import { fonts } from "../../styles/fonts";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.robotoRegular,
    fontSize: 14,
    lineHeight: 14,
    color: colors.error,
  },
});
