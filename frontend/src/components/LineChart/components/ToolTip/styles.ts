import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import { fonts } from "../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    zIndex: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    position: "absolute",
    borderWidth: 1,
    borderColor: "#000000"
  },
  text: {
    fontSize: 13,
    fontFamily: fonts.robotoMedium,
    color: colors.common.white
  },
  arrowIcon: {
    position: "absolute",
    left: "50%",
    bottom: "0%",
    transform: [{ translateX: Platform.OS === "web" ? "-50%" : "25%" }, { translateY: "100%" }]
  }
});
