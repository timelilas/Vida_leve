import { Pressable, Text, View } from "react-native";
import { SuccessCheckIcon } from "../Icons/SuccessCheckIcon";
import { CloseIcon } from "../Icons/CloseIcon";
import { styles } from "./styles";
import { colors } from "../../styles/colors";
import { Modal } from "../Modal";

interface SuccessModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function SuccessModal(props: SuccessModalProps) {
  const { message, isVisible, onClose } = props;

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
        <SuccessCheckIcon style={styles.checkIcon} />
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <CloseIcon stroke={colors.text.primary} />
        </Pressable>
      </View>
    </Modal>
  );
}
