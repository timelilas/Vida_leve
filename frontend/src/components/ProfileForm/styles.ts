import { StyleSheet } from "react-native";
import { fonts } from "../../styles/fonts";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginTop: 32,
    gap: 16,
    marginBottom: 56,
  },
  genderButtons: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 40,
  },
  genderLabel: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 16,
    color: colors.text.primary,
    marginBottom: 8,
  },
  gender: {
    fontSize: 16,
    lineHeight: 16,
    paddingVertical: 14,
    paddingHorizontal: 6,
    fontFamily: fonts.robotoRegular,
    color: colors.text.primary,
  },
  submitButton: {
    marginTop: "auto",
  },
  genderError: {
    marginTop: 8,
  },
});
