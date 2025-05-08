import { Modal } from "../../../../../components/Modal";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { Paragraph } from "../../../../../components/Paragraph/Paragraph";

interface DeleteWeightModalProps {
  message: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteWeightModal(props: DeleteWeightModalProps) {
  const { message, isVisible, onConfirm, onCancel } = props;
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
        <Text style={styles.title}>Confirmar exclusão do registo de peso</Text>
        <Paragraph style={styles.paragraph}>{message}</Paragraph>
        <View style={styles.actionsWrapper}>
          <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onCancel}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Cancelar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onConfirm}>
            <View style={[styles.actionButton, styles.actionButtonFilled]}>
              <Text style={styles.actionButtonText}>Sim, excluir</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
