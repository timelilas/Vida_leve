import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
  },
  dashedContainer: {
    padding: 24,
    width: 120,
    height: 120,
    borderRadius: 130,
    borderWidth: 2.56,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.gray.medium,
  },
  textWrapper: {
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontFamily: fonts.robotoMedium,
    color: colors.gray.dark,
    fontSize: 20,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    color: colors.text.primary,
    textAlign: "center",
  },
});
