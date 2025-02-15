import { StyleSheet } from "react-native";
import { FOOD_ITEM_HEIGHT } from ".";

export const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: FOOD_ITEM_HEIGHT,
    borderBottomColor: "#B7B7B7",
    borderBottomWidth: 1,
  },
  text: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 16,
    color: "#242424",
    fontFamily: "Roboto-400",
  },
});
