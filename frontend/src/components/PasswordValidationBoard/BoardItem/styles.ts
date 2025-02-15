import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  boardItem: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontFamily: "Roboto-400",
    lineHeight: 19,
    color: "#4E4B66",
  },
  textValid: {
    color: "#14AE5C",
  },
  textInvalid: {
    color: "#F95D4D",
  },
});
