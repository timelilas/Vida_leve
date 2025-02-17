import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  body: {
    marginTop: 24,
  },
  separatorLine: {
    height: 1,
    width: "86%",
    alignSelf: "center",
    marginTop: 6,
    backgroundColor: colors.text.primary,
  },
  progressContainer: {
    marginTop: 24,
    gap: 24,
  },
});
