import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  body: {
    padding: 0,
    paddingTop: 24,
    gap: 24
  },
  textContainer: {
    paddingHorizontal: 16
  },
  textWrapper: {
    paddingHorizontal: 16,
    marginTop: 32,
    gap: 16
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary
  },
  text: {
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary
  },
  foodItems: {
    marginBottom: 24
  },
  summaryContainer: {
    marginTop: "auto"
  },
  addFoodButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  addFoodTextWrapper: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  addFoodButtonText: {
    fontSize: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary
  },
  mealCalorieText: {
    fontSize: 16,
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary
  },
  mealCalorieTextBold: {
    fontSize: 20,
    fontFamily: fonts.robotoBold,
    color: colors.text.secondary
  }
});
