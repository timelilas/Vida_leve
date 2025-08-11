import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { APP_FRAME_WIDTH } from "../../constants/webConstants";

export const styles = StyleSheet.create({
  modal: {
    position: "relative",
    maxWidth: APP_FRAME_WIDTH,
    minHeight: 170,
    backgroundColor: colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.success,
    borderRadius: 8,
    padding: 24
  },
  modalWebDesktop: {
    maxWidth: APP_FRAME_WIDTH - 40
  },
  message: {
    color: colors.text.primary,
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: fonts.robotoBold,
    textAlign: "center"
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8
  },
  checkIcon: {
    position: "absolute",
    top: 0,
    transform: [{ translateY: "-50%" }]
  }
});
