import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const styles = StyleSheet.create({
  modal: {
    marginInline: 24,
    maxWidth: 340,
    backgroundColor: colors.common.white,
    borderRadius: 8,
    padding: 24
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: fonts.robotoMedium,
    flexShrink: 1
  },
  paragraph: {
    fontFamily: fonts.robotoLight,
    marginTop: 16
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
