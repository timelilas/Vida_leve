import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    paddingBlock: 12,
    paddingHorizontal: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  message: {
    fontFamily: fonts.robotoRegular,
    fontSize: 15,
    color: colors.text.secondary,
  },
});

export const neutralStyles = StyleSheet.create({
  container: { backgroundColor: colors.gray.medium },
  message: { color: colors.text.secondary },
});

export const errorStyles = StyleSheet.create({
  container: { backgroundColor: colors.error },
  message: { color: colors.common.white },
});

export const successStyles = StyleSheet.create({
  container: { backgroundColor: colors.success },
  message: { color: colors.common.white },
});
