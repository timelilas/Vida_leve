import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: 24,
    gap: 24,
    flexGrow: 1,
  },
  body: {
    paddingHorizontal: 16,
  },
  textWrapper: {
    paddingHorizontal: 16,
    marginTop: 32,
    gap: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  text: {
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary,
  },
});
