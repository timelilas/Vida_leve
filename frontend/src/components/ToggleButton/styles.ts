import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    padding: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4e4b66",
    backgroundColor: "#f7f7fc",
  },
  buttonRounded: {
    borderRadius: 18,
  },
  buttonSelected: {
    backgroundColor: "#ffae31",
    borderColor: "#ffae31",
    borderRadius: 10,
    shadowColor: "#000000",
    ...(Platform.OS === "android"
      ? {
          elevation: 4,
        }
      : {
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
          shadowOpacity: 0.25,
        }),
  },
  container: {
    backgroundColor: "#f7f7fc",
    borderRadius: 8,
  },
  containerRounded: {
    borderRadius: 16,
  },
});
