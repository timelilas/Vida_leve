import { Pressable, Text, View } from "react-native";
import { SuccessCheckIcon } from "../Icons/SuccessCheckIcon";
import { CloseIcon } from "../Icons/CloseIcon";
import { styles } from "./styles";
import Modal from "react-native-modal";

interface SuccessModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function SuccessModal(props: SuccessModalProps) {
  const { message, isVisible, onClose } = props;

  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={500}
      animationIn="zoomIn"
      animationOut="fadeOutUpBig"
      backdropColor="#000000"
      backdropOpacity={0.2}
      isVisible={isVisible}
      style={styles.container}
    >
      <View style={styles.modal}>
        <SuccessCheckIcon style={styles.checkIcon} />
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <CloseIcon stroke="#4E4B66" />
        </Pressable>
      </View>
    </Modal>
  );
}
