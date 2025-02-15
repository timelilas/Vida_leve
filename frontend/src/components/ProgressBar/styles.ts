import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: "#ffffff",
    padding: 2,
    borderRadius: 20,
    height: 20,
    overflow: "hidden",
  },
  preventBarOverflow: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 20,
  },
  prgressBarColored: {
    backgroundColor: "#FFAE31",
    height: "100%",
    width: "0%",
    borderRadius: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerBarText: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
});
