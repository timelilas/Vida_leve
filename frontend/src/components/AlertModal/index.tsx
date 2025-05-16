import { Modal } from "../Modal";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { Paragraph } from "../Paragraph/Paragraph";
import { WarningIcon } from "../Icons/WarningIcon";

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

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
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
