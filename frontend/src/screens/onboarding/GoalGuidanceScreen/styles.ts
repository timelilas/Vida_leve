import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 64,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray.medium,
  },
  title: {
    textAlign: "center",
  },
  guidanceWrapperShadow: {
    overflow: "hidden",
    paddingBottom: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginTop: 16,
  },
  guidanceWrapper: {
    backgroundColor: colors.background.secondary,
    padding: 8,
    borderRadius: 16,
    gap: 16,
    shadowColor: colors.common.black,
    ...{
      ...(Platform.OS === "android"
        ? {
            elevation: 4,
          }
        : {
            shadowOffset: { height: 4, width: 0 },
            shadowRadius: 4,
            shadowOpacity: 0.25,
          }),
    },
  },
  adviceWrapper: {
    marginTop: 16,
    gap: 8,
    alignItems: "center",
  },
  adviceDescription: {
    fontSize: 16,
    fontFamily: fonts.robotoLight,
    textAlign: "center",
    color: colors.text.secondary,
  },
  adviceImageBox: {
    maxWidth: 314,
    height: 209,
    width: "100%",
  },
  adviceImage: {
    width: "100%",
    height: "100%",
  },
  adviceLabel: {
    fontFamily: fonts.robotoLight,
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 36,
  },
  resetToHomeButton: {
    marginTop: "auto",
  },
});
