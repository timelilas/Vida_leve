import { Modal } from "../Modal";
import { styles } from "./styles";
import { Platform, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Paragraph } from "../Paragraph/Paragraph";
import { WarningIcon } from "../Icons/WarningIcon";
import { WEB_SCREEN_WIDTH_BREAKPOINT } from "../../constants/webConstants";

interface AlertModalProps {
  title: string;
  message: string;
  isVisible: boolean;
  onConfirmText: string;
  onCancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AlertModal(props: AlertModalProps) {
  const { title, message, isVisible, onCancelText, onConfirmText, onConfirm, onCancel } =
    props;
  const dimensions = useWindowDimensions();
  const isWebDesktop =
    Platform.OS === "web" && dimensions.width >= WEB_SCREEN_WIDTH_BREAKPOINT;

  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.modal, isWebDesktop && styles.modalWeb]}>
        <View style={styles.titleContainer}>
          <WarningIcon />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Paragraph style={styles.paragraph}>{message}</Paragraph>
        <View style={styles.actionsWrapper}>
          <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onCancel}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{onCancelText}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onConfirm}>
            <View style={[styles.actionButton, styles.actionButtonFilled]}>
              <Text style={styles.actionButtonText}>{onConfirmText}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
