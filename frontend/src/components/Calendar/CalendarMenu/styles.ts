import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#EFF0F6",
    borderRadius: 16,
    borderColor: "#CAC4D0",
    borderWidth: 1,
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#CAC4D0",
    borderBottomWidth: 1,
  },
  listContainer: {
    maxHeight: 272.5,
  },
  sectionButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: "Roboto-500",
    color: "#49454F",
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "flex-end",
  },
});
