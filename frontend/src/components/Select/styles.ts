import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.secondary,
    height: 48,
    borderRadius: 8,
    paddingRight: 16,
    paddingLeft: 20,
  },
  selectedItemText: {
    color: colors.text.primary,
    fontSize: 18,
    lineHeight: 20,
    fontFamily: fonts.robotoRegular,
  },
  itemText: {
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 16,
  },
  rightIcon: {
    transform: [{ rotate: "-90deg" }],
  },
});
