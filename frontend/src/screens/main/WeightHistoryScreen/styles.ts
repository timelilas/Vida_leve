import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary
  },
  dayTitle: {
    marginTop: 24,
    marginInline: "auto"
  },
  dayPickerContainer: {
    marginTop: 12
  },
  textWrapper: {
    marginTop: 16,
    gap: 16,
    paddingInline: 16
  },
  paragraph: {
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary
  },
  separatorLine: {
    marginTop: 16,
    marginBottom: 24,
    height: 1,
    width: "100%",
    backgroundColor: colors.gray.medium
  },
  weightTableContainer: {
    position: "relative",
    marginBottom: 40,
    paddingHorizontal: 16
  },
  submitButton: {
    marginTop: "auto"
  },
  activityIndicatorContainer: {
    justifyContent: "center"
  }
});
