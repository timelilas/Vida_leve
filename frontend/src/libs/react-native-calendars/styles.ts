import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const baseStyles = StyleSheet.create({
  container: {
    padding: 0
  },
  textDay: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    color: "#1D1B20"
  }
});

export const markedStyles = StyleSheet.create({
  text: {
    color: colors.common.white
  },
  container: {
    backgroundColor: colors.primary,
    borderRadius: 20
  }
});
