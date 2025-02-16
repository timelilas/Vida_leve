import { StyleSheet } from "react-native";
import { FOOD_ITEM_HEIGHT } from "./constants";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: FOOD_ITEM_HEIGHT,
    borderBottomColor: colors.gray.medium,
    borderBottomWidth: 1,
  },
  text: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 16,
    color: colors.text.secondary,
    fontFamily: fonts.robotoRegular,
  },
});
