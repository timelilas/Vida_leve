import { Pressable, Text, View } from "react-native";
import { SuccessCheckIcon } from "../Icons/SuccessCheckIcon";
import { CloseIcon } from "../Icons/CloseIcon";
import { styles } from "./styles";
import Modal from "react-native-modal";
import { colors } from "../../styles/colors";

interface SuccessModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function SuccessModal(props: SuccessModalProps) {
  const { message, isVisible, onClose } = props;

  return (
    <View>
      <Modal
        animationInTiming={350}
        animationOutTiming={600}
        animationIn="zoomIn"
        animationOut="fadeOutUpBig"
        backdropColor={colors.common.black}
        backdropOpacity={0.2}
        isVisible={isVisible}
        style={styles.container}>
        <View style={styles.modal}>
          <SuccessCheckIcon style={styles.checkIcon} />
          <Text style={styles.message}>{message}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <CloseIcon stroke={colors.text.primary} />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
