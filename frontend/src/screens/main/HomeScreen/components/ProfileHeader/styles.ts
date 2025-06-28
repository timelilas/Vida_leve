import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";
import { fonts } from "../../../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  avatar: {
    padding: 8
  },
  profilImageContainer: {
    width: 88,
    height: 88,
    backgroundColor: colors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 44,
    overflow: "hidden"
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  updateImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray.medium
  },
  updateProfileButton: {
    marginLeft: "auto"
  },
  userInformation: {
    gap: 4,
    flexShrink: 1
  },
  userName: {
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: fonts.robotoBold,
    color: colors.text.primary
  }
});
