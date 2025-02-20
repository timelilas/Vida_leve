import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 24,
    borderColor: colors.gray.medium,
    borderWidth: 2,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: "auto",
    gap: 14,
  },
  addFoodButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  addFoodTextWrapper: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  addFoodButtonText: {
    fontSize: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.text.secondary,
  },
  mealCalorieText: {
    fontSize: 16,
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary,
  },
  mealCalorieTextBold: {
    fontSize: 20,
    fontFamily: fonts.robotoBold,
    color: colors.text.secondary,
  },
});
