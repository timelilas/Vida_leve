import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  calendarButton: {
    borderRadius: 24,
    backgroundColor: colors.gray.medium,
    padding: 6,
    marginRight: 3,
  },
  calendarButtonDisabled: {
    opacity: 0.5,
  },
});
