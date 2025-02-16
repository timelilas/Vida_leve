import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.text.primary,
    borderStyle: "solid",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
  },
  nestedContainer: {
    paddingLeft: 10,
  },
  deepNestedContainer: {
    paddingLeft: 22,
  },
});
