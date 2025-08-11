import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { APP_FRAME_WIDTH } from "../../constants/webConstants";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    padding: 24,
    paddingTop: 32,
    maxWidth: APP_FRAME_WIDTH,
    backgroundColor: colors.common.white,
    borderRadius: 8
  },
  modalWebDesktop: {
    maxWidth: APP_FRAME_WIDTH - 40
  },
  paragraph: {
    fontFamily: fonts.robotoLight
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10
  }
});
