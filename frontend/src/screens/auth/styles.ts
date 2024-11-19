import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  title: {
    marginTop: 8,
  },
  logo: {
    alignSelf: "center",
    marginTop: 40,
  },
  form: {
    width: "100%",
    gap: 16,
    marginTop: 40,
    marginBottom: 56,
  },
  button: {
    marginTop: "auto",
  },
  error: {
    marginTop: 8,
  },
});

export default styles;
