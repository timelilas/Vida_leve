import { Platform, Pressable, Text, useWindowDimensions, View } from "react-native";
import { SuccessCheckIcon } from "../Icons/SuccessCheckIcon";
import { CloseIcon } from "../Icons/CloseIcon";
import { styles } from "./styles";
import { colors } from "../../styles/colors";
import { Modal } from "../Modal";
import { WEB_SCREEN_WIDTH_BREAKPOINT } from "../../constants/webConstants";

interface SuccessModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function SuccessModal(props: SuccessModalProps) {
  const { message, isVisible, onClose } = props;
  const dimensions = useWindowDimensions();
  const isWebDesktop =
    Platform.OS === "web" && dimensions.width >= WEB_SCREEN_WIDTH_BREAKPOINT;

  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.modal, isWebDesktop && styles.modalWeb]}>
        <SuccessCheckIcon style={styles.checkIcon} />
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <CloseIcon stroke={colors.text.primary} />
        </Pressable>
      </View>
    </Modal>
  );
}
