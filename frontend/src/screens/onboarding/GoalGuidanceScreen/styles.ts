import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 64,
  },
  separator: {
    height: 1,
    backgroundColor: "#B7B7B7",
  },
  title: {
    textAlign: "center",
  },
  guidanceWrapperShadow: {
    overflow: "hidden",
    paddingBottom: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginTop: 16,
  },
  guidanceWrapper: {
    backgroundColor: "#f7f7fc",
    padding: 8,
    borderRadius: 16,
    gap: 16,
    shadowColor: "#000000",
    ...{
      ...(Platform.OS === "android"
        ? {
            elevation: 4,
          }
        : {
            shadowOffset: { height: 4, width: 0 },
            shadowRadius: 4,
            shadowOpacity: 0.25,
          }),
    },
  },
  adviceWrapper: {
    marginTop: 16,
    gap: 8,
    alignItems: "center",
  },
  adviceDescription: {
    fontSize: 16,
    fontFamily: "Roboto-300",
    textAlign: "center",
    color: "#242424",
  },
  adviceImageBox: {
    maxWidth: 314,
    height: 209,
    width: "100%",
  },
  adviceImage: {
    width: "100%",
    height: "100%",
  },
  adviceLabel: {
    fontFamily: "Roboto-300",
    fontSize: 14,
    color: "#242424",
    textAlign: "center",
    marginBottom: 36,
  },
  resetToHomeButton: {
    marginTop: "auto",
  },
});
