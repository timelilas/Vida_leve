import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  title: {
    marginTop: 40,
  },
  text: {
    marginTop: 8,
  },
  form: {
    marginTop: 40,
    gap: 16,
    marginBottom: 56,
  },
  genderButtons: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 40,
  },
  genderLabel: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
    color: "#4E4B66",
    marginBottom: 8,
  },
  gender: {
    fontSize: 16,
    lineHeight: 16,
    paddingVertical: 14,
    paddingHorizontal: 6,
    fontFamily: "Roboto-400",
    color: "#4E4B66",
  },
  submitButton: {
    marginTop: "auto",
  },
  genderError: {
    marginTop: 8,
  },
});
