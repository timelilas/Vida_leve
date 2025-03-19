import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: 24,
  },
  body: {
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    paddingHorizontal: 16,
    marginTop: 32,
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  text: {
    paddingHorizontal: 16,
    marginTop: 16,
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary,
  },
  inputBox: {
    marginTop: 24,
  },
  activityIndicatorContainer: {
    height: 60,
    justifyContent: "center",
  },
});
