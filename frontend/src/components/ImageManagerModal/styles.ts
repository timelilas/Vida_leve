import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 32,
    marginInline: 24,
    maxWidth: 360,
    backgroundColor: colors.common.white,
    borderRadius: 8
  },
  paragraph: {
    fontFamily: fonts.robotoLight
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8
  }
});
