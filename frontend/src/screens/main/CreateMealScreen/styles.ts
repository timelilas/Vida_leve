import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  dayPicker: {
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
  },
  dayTitle: {
    color: colors.text.secondary,
    marginTop: 16,
    marginInline: "auto",
  },
  mealButtons: {
    marginTop: 16,
    gap: 16,
  },
});
