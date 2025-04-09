import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import { fonts } from "../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    zIndex: 20,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    position: "absolute",
    borderWidth: 1,
    borderColor: "#2e2e2e"
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.robotoMedium,
    color: colors.common.white
  },
  arrow: {
    position: "absolute",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    borderLeftWidth: 4,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    bottom: 0,
    left: "50%",
    transform: [
      { rotate: "180deg" },
      { translateY: "-100%" },
      { translateX: Platform.OS === "web" ? "50%" : "-25%" }
    ]
  },
  arrowBorder: {
    position: "absolute",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 8,
    borderLeftWidth: 5,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "#2e2e2e",
    bottom: 0,
    left: "50%",
    transform: [
      { rotate: "180deg" },
      { translateY: "-100%" },
      { translateX: Platform.OS === "web" ? "50%" : "-10%" }
    ]
  }
});
