import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { APP_FRAME_HEIGHT, APP_FRAME_WIDTH } from "../../constants/webConstants";

export const styles = StyleSheet.create({
  outerContainer: {
    minHeight: 900,
    height: "100%",
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFBEB"
  },
  innerContainer: {
    height: APP_FRAME_HEIGHT,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: 24
  },
  appFrame: {
    width: APP_FRAME_WIDTH,
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: colors.gray.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25
  }
});
