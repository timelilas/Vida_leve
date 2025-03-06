import { Image, TouchableOpacity, View } from "react-native";
import { ProfileIcon } from "../../../../../components/Icons/ProfileIcon";
import { CameraIcon } from "../../../../../components/Icons/CameraIcon";
import { ScreenTitle } from "../../../../../components/ScreenTitle";
import { Paragraph } from "../../../../../components/Paragraph/Paragraph";
import { PencilIcon } from "../../../../../components/Icons/PencilIcon";
import { styles } from "./styles";
import { useUser } from "../../../../../hooks/user/useUser";

export function ProileHeader() {
  const { user } = useUser();
  const firstName = user.name?.split(" ")[0];
  const profileImage = null;

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View style={styles.profilImageContainer}>
          {profileImage ? <Image /> : <ProfileIcon />}
        </View>
        <TouchableOpacity style={styles.updateImageButton}>
          <CameraIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.userInformation}>
        <ScreenTitle title={firstName || ""} />
        <Paragraph>{user.email}</Paragraph>
      </View>
      <TouchableOpacity style={styles.updateProfileButton}>
        <PencilIcon />
      </TouchableOpacity>
    </View>
  );
}
