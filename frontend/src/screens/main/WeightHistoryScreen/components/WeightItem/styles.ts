import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";

export const styles = StyleSheet.create({
  weightItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden"
  },
  weightItemText: {
    color: colors.common.black,
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    verticalAlign: "bottom"
  },
  itemActionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  itemActionButtonText: {
    color: colors.error,
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    verticalAlign: "bottom"
  }
});
