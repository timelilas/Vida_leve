import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    borderColor: "#CAC4D0",
    borderWidth: 1,
    padding: 8,
  },
  footer: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  leftFooterButton: {
    marginRight: "auto",
  },
});
