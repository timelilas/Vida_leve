import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const styles = StyleSheet.create({
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.common.white,
    padding: 2,
    gap: 4,
    paddingRight: 6,
    borderRadius: 20,
    height: 20,
    overflow: "hidden",
  },
  preventBarOverflow: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 20,
  },
  prgressBarColored: {
    backgroundColor: colors.secondary,
    height: "100%",
    width: "0%",
    borderRadius: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerBarText: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
  },
  innerBarTextBold: {
    fontFamily: fonts.robotoBold,
  },
});
