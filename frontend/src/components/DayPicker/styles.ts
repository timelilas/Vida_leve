import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listContainer: {
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 8,
  },
  listItemSeparator: {
    width: 8,
  },
  rightArrowIcon: {
    transform: [{ rotate: "180deg" }],
  },
});
