import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";
import { APP_FRAME_WIDTH } from "../../../../../constants/webConstants";

export const styles = StyleSheet.create({
  modal: {
    marginInline: 24,
    maxWidth: APP_FRAME_WIDTH,
    backgroundColor: colors.common.white,
    borderRadius: 8,
    padding: 24
  },
  modalWeb: {
    maxWidth: APP_FRAME_WIDTH - 40
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary,
    fontFamily: fonts.robotoRegular
  },
  textWrapper: {
    gap: 16
  },
  paragraph: {
    flexShrink: 1,
    fontFamily: fonts.robotoLight
  },
  warningContainer: {
    marginTop: 16,
    width: "100%",
    paddingInline: 8,
    flexDirection: "row",
    gap: 8
  },
  warningIcon: {
    marginTop: 4,
    flexShrink: 0
  },
  inputSection: {
    marginTop: 16,
    paddingInline: 8,
    gap: 12
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24
  },
  weightInputLabel: {
    fontFamily: fonts.robotoMedium,
    fontSize: 20,
    color: colors.text.primary
  },
  weightInput: {
    flexShrink: 1,
    width: "100%",
    flex: 1,
    height: 54,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.robotoRegular,
    color: colors.text.primary
  },
  weightInputError: {
    borderColor: colors.error
  },
  weightInputDisabled: {
    opacity: 0.5
  },
  inputErrorMessage: {
    color: colors.error,
    fontFamily: fonts.robotoRegular,
    fontSize: 14,
    lineHeight: 14
  },
  actionsWrapper: {
    marginTop: 24,
    gap: 40,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    flex: 1
  },
  actionButton: {
    height: 34,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.secondary,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  actionButtonDisabled: {
    opacity: 0.5
  },
  actionButtonFilled: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.text.primary
  },
  actionButtonText: {
    fontSize: 14,
    lineHeight: 14,
    color: colors.text.secondary,
    fontFamily: fonts.robotoLight
  }
});
