import { StyleSheet } from "react-native";
import { fonts } from "../../styles/fonts";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  tooltipContainer: {
    alignItems: "center",
    gap: 2
  },
  tooltipContainerDivision: {
    borderRadius: 16,
    width: "100%",
    height: 1,
    backgroundColor: colors.common.white
  },
  labelText: {
    fontSize: 13,
    fontFamily: fonts.robotoRegular,
    color: colors.common.white
  },
  valueText: {
    fontSize: 13,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary
  }
});
