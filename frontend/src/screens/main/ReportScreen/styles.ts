import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  textWrapper: {
    marginTop: 32,
    paddingHorizontal: 16,
    gap: 16
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary
  },
  text: {
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary
  },
  inputWrapper: {
    marginTop: 32,
    gap: 16
  },
  chartContainer: {
    gap: 32,
    marginTop: 40
  },
  labelsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linkButton: {
    marginTop: 32,
    marginLeft: "auto"
  }
});
