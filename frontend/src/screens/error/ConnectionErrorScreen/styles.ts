import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 56,
    justifyContent: "space-between",
  },
  contentContainer: {
    gap: 8,
    marginTop: 105,
  },
  buttonWrapper: {
    gap: 24,
    marginTop: "auto",
  },
  closeAppButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  closeAppButtonLabel: {
    color: colors.secondary,
    fontFamily: fonts.robotoBold,
    fontSize: 16,
    lineHeight: 16,
  },
  reloadButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  reloadButtonLabel: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 16,
    color: colors.text.secondary,
  },
});
