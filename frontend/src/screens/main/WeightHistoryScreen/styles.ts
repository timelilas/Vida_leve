import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1
  },
  body: {
    paddingTop: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
    gap: 24
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.text.secondary
  },
  dayTitle: {
    marginTop: 24,
    marginInline: "auto"
  },
  dayPickerContainer: {
    marginTop: 12
  },
  textWrapper: {
    marginTop: 16,
    gap: 16,
    paddingInline: 16
  },
  paragraph: {
    fontFamily: fonts.robotoLight,
    color: colors.text.secondary
  },
  separatorLine: {
    height: 1,
    width: "100%",
    backgroundColor: colors.gray.medium
  },
  weightTableContainer: {
    position: "relative"
  },
  weightTableInnerContainer: {
    paddingHorizontal: 8
  },
  activityIndicatorContainer: {
    justifyContent: "center"
  },
  bottom: {
    marginTop: "auto",
    paddingHorizontal: 40,
    paddingVertical: 24,
    borderColor: colors.gray.medium,
    borderWidth: 2,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24
  }
});
