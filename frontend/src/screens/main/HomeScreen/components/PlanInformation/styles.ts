import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleThin: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-300",
    color: "#4e4b66",
    marginBottom: 8,
  },
  titleRegular: {
    fontFamily: "Roboto-400",
  },
  targetCalorie: {
    borderRadius: 8,
    height: 48,
    borderWidth: 3,
    borderColor: "#ffae31",
    justifyContent: "center",
    backgroundColor: "#f7f7fc",
    shadowColor: "#000000",
    ...(Platform.OS === "android"
      ? {
          elevation: 2,
        }
      : {
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
          shadowOpacity: 0.25,
        }),
  },
  targetCalorieText: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "##242424",
    textAlign: "center",
  },
  adjustGoalButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  adjustGoalText: {
    textAlign: "auto",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto-300",
    color: "#0000FF",
  },
});
