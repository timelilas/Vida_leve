import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  logo: {
    marginTop: 40,
  },
  form: {
    width: "100%",
    gap: 24,
    marginTop: 40,
    marginBottom: 56,
  },
  title: {
    fontFamily: "Roboto-700",
    fontSize: 24,
    lineHeight: 28.8,
    textAlign: "center",
    color: "#4E4B66",
    marginTop: 40,
  },
  button: {
    width: "100%",
    marginTop: "auto",
  },
});

export default styles;
