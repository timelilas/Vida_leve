import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";
import { ITEM_BOX_HEIGHT } from "./constants";

export const styles = StyleSheet.create({
  container: {
    marginTop: -1,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray.medium,
  },
  innerContainer: {
    gap: 16,
    alignItems: "flex-end",
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
    verticalAlign: "middle",
  },
  itemBox: {
    backgroundColor: colors.background.secondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray.medium,
    height: ITEM_BOX_HEIGHT,
  },
  textScrollView: {
    height: "100%",
  },
  textScrollContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemBoxWrapper: {
    flex: 1,
  },
  foodDetails: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 4,
  },
  itemHeader: {
    gap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 39,
  },
  calorieText: {
    flexShrink: 0,
    fontSize: 14,
    lineHeight: 14,
    fontFamily: fonts.robotoRegular,
    color: colors.primary,
  },
  measurementControl: {
    marginTop: 8,
    flexDirection: "row",
    gap: 16,
  },
  counter: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  measurementUnit: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  removeFoodButton: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  toggleItemButton: {
    marginTop: (ITEM_BOX_HEIGHT - 24) / 2,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  chvronIconDown: {
    transform: [{ rotate: "180deg" }],
  },
});
