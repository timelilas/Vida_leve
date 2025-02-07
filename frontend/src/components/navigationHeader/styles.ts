import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  navigatinContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  titleNavigationContainer: {
    paddingVertical: 14,
    paddingInline: 4,
    backgroundColor: "#F7F7FC",
  },
  titleBox: {
    gap: 6,
    marginLeft: 32,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: "#242424",
    fontFamily: "Roboto-400",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 14,
    color: "#242424",
    fontFamily: "Roboto-300",
  },
  brand: {
    marginTop: -8,
    marginHorizontal: "auto",
  },
  closeButton: {
    marginLeft: "auto",
  },
});
