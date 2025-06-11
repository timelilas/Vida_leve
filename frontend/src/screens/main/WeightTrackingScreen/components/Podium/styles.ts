import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  place: {
    position: "relative",
    paddingBottom: 12,
    backgroundColor: colors.primary,
    gap: 4,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  thirdPlace: {
    height: 60
  },
  secondPlace: {
    height: 80
  },
  firstPlace: {
    height: 100
  },
  date: {
    fontFamily: fonts.robotoRegular,
    color: colors.common.white,
    fontSize: 14,
    lineHeight: 14
  },
  value: {
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
    fontSize: 16,
    lineHeight: 16
  },
  finishFlagImage: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-90%" }]
  },
  finishFlagImageRight: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: [{ translateY: "-90%" }, { translateX: "-5%" }]
  },
  runningAvocadoImage: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    right: 0,
    transform: [{ translateY: "-140%" }, { translateX: "35%" }, { rotate: "-20deg" }]
  },
  avocadoWithTrophyContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 52,
    height: 46,
    transform: [{ translateY: "-85%" }, { translateX: "-10%" }]
  },
  avocadoWithTrophy: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  }
});
