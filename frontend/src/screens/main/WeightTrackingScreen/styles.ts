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
  paragraphBold: {
    fontFamily: fonts.robotoMedium,
    color: colors.text.secondary
  },
  podiumContainer: {
    gap: 8,
    marginTop: 8,
    paddingInline: 16
  },
  podium: {
    height: 165,
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary
  },
  linkButton: {
    marginLeft: "auto",
    marginTop: 12
  },
  separatorLine: {
    marginTop: 16,
    marginBottom: 24,
    height: 1,
    width: "100%",
    backgroundColor: colors.gray.medium
  },
  chartContainer: {
    marginBottom: 40
  },
  submitButton: {
    marginTop: "auto"
  }
});
