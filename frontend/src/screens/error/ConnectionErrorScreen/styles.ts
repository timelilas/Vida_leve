import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 56,
    justifyContent: "space-between",
  },
  containerContainer: {
    gap: 8,
    marginTop: 105,
  },
  buttonWrapper: {
    gap: 24,
    marginTop: "auto",
  },
  closeAppButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  closeAppButtonLabel: {
    color: colors.secondary,
    fontFamily: fonts.rudaBold,
    fontSize: 16,
    lineHeight: 16,
  },
});
