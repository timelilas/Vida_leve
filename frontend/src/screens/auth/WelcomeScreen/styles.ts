import { Platform } from "react-native";
import { StyleSheet } from "react-native";

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
    ...(Platform.OS === "android"
      ? {
          shadowColor: "#000000",
          elevation: 6,
        }
      : {
          shadowColor: "#00000040",
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
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
    fontFamily: "Ruda-700",
    fontSize: 48,
    lineHeight: 53,
    color: "#3AA1A8",
  },
  titleRoboto: {
    fontFamily: "Roboto-400",
    fontSize: 24,
    lineHeight: 24,
    color: "#242424",
  },
  titleRobotoBold: {
    fontFamily: "Roboto-700",
    color: "#FFAE31",
  },
  buttonWrapper: {
    marginTop: "auto",
    gap: 16,
  },
});
