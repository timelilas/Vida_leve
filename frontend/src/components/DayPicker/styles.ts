import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  listContainer: {
    alignItems: "center",
    marginInline: "auto",
    paddingTop: 4,
    paddingBottom: 8
  },
  listItemSeparator: {
    width: 8
  },
  buttonDisabled: {
    opacity: 0.3
  },
  rightArrowIcon: {
    transform: [{ rotate: "180deg" }]
  }
});
