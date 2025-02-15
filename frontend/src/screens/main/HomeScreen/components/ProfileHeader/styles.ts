import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    padding: 8,
  },
  profilImageContainer: {
    width: 88,
    height: 88,
    backgroundColor: "#f7f7fC",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 44,
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
    backgroundColor: "#b7b7b7",
  },
  updateProfileButton: {
    marginLeft: "auto",
  },
  userInformation: {
    gap: 4,
    flexShrink: 1,
  },
  userName: {
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: "Roboto-700",
    color: "#4E4B66",
  },
});
