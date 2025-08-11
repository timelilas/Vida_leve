import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";
import {
  WEIGHT_TABLE_ITEM_MARGIN_BOTTOM,
  WEIGHT_TABLE_ITEM_HEIGHT
} from "../WeightItem/constants";

export const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  tableHeaderText: {
    textAlign: "center",
    width: `${100 / 3}%`,
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 16,
    color: colors.text.secondary,
    fontFamily: fonts.robotoLight
  },
  tableHeaderTextLeftAligned: {
    textAlign: "left"
  },
  tableHeaderTextRightAligned: {
    textAlign: "right"
  },
  tableBody: {
    overflow: "hidden"
  },
  list: {
    maxHeight: (WEIGHT_TABLE_ITEM_MARGIN_BOTTOM + WEIGHT_TABLE_ITEM_HEIGHT) * 10,
    paddingHorizontal: 8
  },
  weightItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
  }
});
