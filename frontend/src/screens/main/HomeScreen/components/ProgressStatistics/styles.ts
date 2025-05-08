import { StyleSheet } from "react-native";
import { fonts } from "../../../../../styles/fonts";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoLight,
    color: colors.text.primary
  },
  calorieProgress: {
    paddingBlock: 10,
    gap: 10
  },
  foodIconsWrapper: {
    gap: 32,
    rowGap: 16,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonText: {
    textAlign: "auto",
    fontSize: 14,
    fontFamily: fonts.robotoLight,
    color: colors.blue
  }
});
