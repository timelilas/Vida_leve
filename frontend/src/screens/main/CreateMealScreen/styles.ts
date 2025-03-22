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
    marginTop: 24,
    marginInline: "auto",
  },
  mealButtons: {
    marginTop: 16,
    gap: 16,
  },
  marginBottom: {
    marginBottom: 40,
  },
  submitButton: {
    marginTop: "auto",
  },
  skeletonLoaderContainer: {
    gap: 16,
  },
  backHomeButton: {
    marginTop: "auto",
  },
});
