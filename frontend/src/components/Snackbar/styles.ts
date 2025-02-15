import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBlock: 12,
    paddingHorizontal: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  message: {
    fontFamily: "Roboto-400",
    fontSize: 15,
    color: "#ffffff",
  },
});

export const neutralStyles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
  message: { color: "#ffffff" },
});

export const errorStyles = StyleSheet.create({
  container: { backgroundColor: "#DC2626" },
  message: { color: "#ffffff" },
});

export const successStyles = StyleSheet.create({
  container: { backgroundColor: "#16A34A" },
  message: { color: "#ffffff" },
});
