import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 56,
    justifyContent: "space-between",
  },
  containerContainer: {
    gap: 8,
    marginTop: 105,
  },
  buttonWrapper: {
    gap: 24,
    marginTop: "auto",
  },
  closeAppButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  closeAppButtonLabel: {
    color: "#FFAE31",
    fontFamily: "Roboto-700",
    fontSize: 16,
    lineHeight: 16,
  },
});
