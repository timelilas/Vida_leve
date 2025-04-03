import { StyleSheet } from "react-native";
import { fonts } from "../../styles/fonts";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  labelItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labelText: {
    fontFamily: fonts.robotoLight,
    fontSize: 14,
    lineHeight: 16,
    color: colors.common.black,
  },
  labelMarker: {
    height: 12,
    width: 16,
    borderRadius: 2,
  },
});
