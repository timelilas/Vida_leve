import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import { fonts } from "../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    marginInline: 24,
    maxWidth: 340,
    backgroundColor: colors.common.white,
    borderRadius: 8,
    padding: 24
  },
  optionsWrapper: {
    gap: 12,
    marginTop: 16
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8
  },
  optionButtonTextContainer: {
    flexShrink: 1,
    alignItems: "flex-end"
  },
  optionButtonTitle: {
    fontFamily: fonts.robotoMedium,
    color: colors.text.secondary,
    fontSize: 16,
    lineHeight: 16
  },
  optionButtonText: {
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 14,
    textAlign: "right"
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8
  }
});
