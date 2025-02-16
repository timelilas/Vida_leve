import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: fonts.robotoMedium,
    color: "#49454F",
  },
});
