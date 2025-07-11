import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  navigatinContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  titleNavigationContainer: {
    paddingVertical: 14,
    paddingInline: 4,
    backgroundColor: colors.background.secondary
  },
  titleBox: {
    gap: 6,
    marginLeft: 32
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary,
    fontFamily: fonts.robotoRegular
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 14,
    color: colors.text.secondary,
    fontFamily: fonts.robotoLight
  },
  brand: {
    marginHorizontal: "auto"
  },
  brandNegativeMargin: {
    marginTop: -12
  },
  closeButton: {
    marginLeft: "auto"
  },
  signoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  signoutButtonContainer: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: [{ translateY: "-50%" }]
  },
  signoutText: {
    color: colors.text.primary,
    fontFamily: fonts.robotoRegular,
    fontSize: 16
  }
});
