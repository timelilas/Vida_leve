import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingInline: 16,
    borderWidth: 1,
    backgroundColor: colors.background.secondary,
    borderColor: colors.text.primary,
    borderRadius: 8,
    height: 48,
  },
  containerFilled: {
    borderColor: colors.primary,
  },
  input: {
    height: "100%",
    flex: 1,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
    fontSize: 16,
    lineHeight: 16,
  },
  icon: {
    marginLeft: "auto",
  },
});
