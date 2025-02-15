import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  modal: {
    position: "relative",
    width: "100%",
    maxWidth: 390,
    minHeight: 170,
    backgroundColor: "#eff0f6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#14ae5c",
    borderRadius: 8,
    padding: 24,
  },
  message: {
    color: "#4e4b66",
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: "Roboto-700",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  checkIcon: {
    position: "absolute",
    top: 0,
    transform: [{ translateY: "-50%" }],
  },
});
