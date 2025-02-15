import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingInline: 16,
    borderWidth: 1,
    backgroundColor: "#F7F7FC",
    borderColor: "#4E4B66",
    borderRadius: 8,
    height: 48,
  },
  containerFilled: {
    borderColor: "#3AA1A8",
  },
  input: {
    height: "100%",
    flex: 1,
    fontFamily: "Roboto-400",
    color: "#242424",
    fontSize: 16,
    lineHeight: 16,
  },
  icon: {
    marginLeft: "auto",
  },
});
