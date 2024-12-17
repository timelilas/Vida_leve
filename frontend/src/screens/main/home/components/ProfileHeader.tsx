import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ProfileIcon } from "../../../../components/icons/ProfileIcon";
import { CameraIcon } from "../../../../components/icons/CameraIcon";
import { ScreenTitle } from "../../../../components/ScreenTitle";
import { Paragraph } from "../../../../components/Paragraph";
import { PencilIcon } from "../../../../components/icons/PencilIcon";

interface ProfileHeaderProps {
  name: string;
  email: string;
  imgUrl?: string;
}

export function ProileHeader(props: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View style={styles.profilImageContainer}>
          {props.imgUrl ? <Image /> : <ProfileIcon />}
        </View>
        <TouchableOpacity style={styles.updateImageButton}>
          <CameraIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.userInformation}>
        <ScreenTitle title={props.name} />
        <Paragraph text={props.email} />
      </View>
      <TouchableOpacity style={styles.updateProfileButton}>
        <PencilIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
