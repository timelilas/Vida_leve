import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: fonts.robotoMedium,
    fontSize: 14,
    color: colors.text.secondary,
  },
});
