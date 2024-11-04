import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFF0F6',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  scrollView: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputs: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 28.8,
    textAlign: "center",
    color: "#4E4B66",
    marginBottom: 20,
  },
  button: {
    backgroundColor : "#FFAE31",
    width: "100%",
    height: 48, 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "left",
  },
});

export default styles;
