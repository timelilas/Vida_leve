import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/fonts";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    gap: 56,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flex: 1,
    justifyContent: "center",
    gap: 56,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 368,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
    overflow: "hidden",
    shadowColor: colors.common.black,
    ...(Platform.OS === "android"
      ? {
          elevation: 6,
        }
      : {
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
          shadowOpacity: 0.25,
        }),
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  backgroundVegetablesImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    marginBottom: 60,
  },
  titleContainer: {
    marginTop: "auto",
  },
  titleRuda: {
    fontFamily: fonts.rudaBold,
    fontSize: 48,
    lineHeight: 53,
    color: colors.primary,
  },
  titleRoboto: {
    fontFamily: fonts.robotoRegular,
    fontSize: 24,
    lineHeight: 24,
    color: colors.text.secondary,
  },
  titleRobotoBold: {
    fontFamily: fonts.robotoBold,
    color: colors.secondary,
  },
  buttonWrapper: {
    marginTop: "auto",
    gap: 16,
  },
});
