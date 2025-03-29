import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  textWrapper: {
    marginTop: 32,
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  text: {
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary,
  },
  inputWrapper: {
    marginTop: 32,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary,
  },
  summaryContainer: {
    gap: 32,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  summaryContainerSkeleton: {
    paddingHorizontal: 16,
    marginTop: 40,
  },
  avgCalorieConsumption: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: fonts.robotoBold,
    color: colors.text.secondary,
    alignSelf: "center",
  },
  feedbackMessage: {
    alignSelf: "center",
    fontSize: 14,
    fontFamily: fonts.robotoRegular,
    color: colors.common.black,
  },
  separatorLine: {
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: colors.gray.medium,
    height: 1,
  },
  chartContainer: {
    gap: 32,
    marginBottom: 40,
  },
  chartContainerSkeleton: {
    marginBottom: 40,
  },
  chart: {
    alignSelf: "center",
  },
  labelsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labelText: {
    fontFamily: fonts.robotoLight,
    fontSize: 14,
    lineHeight: 16,
    color: colors.common.black,
  },
  labelMarker: {
    height: 12,
    width: 16,
    borderRadius: 2,
  },
  backHomeButton: {
    marginTop: "auto",
  },
});
