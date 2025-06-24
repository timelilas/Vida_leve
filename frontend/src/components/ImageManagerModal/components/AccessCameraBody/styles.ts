import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";
import { fonts } from "../../../../styles/fonts";

export const styles = StyleSheet.create({
  cameraView: {
    marginTop: 16,
    marginHorizontal: "auto",
    position: "relative",
    width: 160,
    height: 160,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: colors.background.primary
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    height: "100%",
    width: 2,
    backgroundColor: colors.common.white
  },
  horizontalLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: [{ translateY: "-50%" }],
    height: 2,
    width: "100%",
    backgroundColor: colors.common.white
  },
  actionsWrapper: {
    marginTop: 24,
    gap: 40,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    flex: 1
  },
  actionButton: {
    height: 34,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.secondary,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  actionButtonFilled: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.text.primary
  },
  actionButtonText: {
    fontSize: 14,
    lineHeight: 14,
    color: colors.text.secondary,
    fontFamily: fonts.robotoLight
  }
});
