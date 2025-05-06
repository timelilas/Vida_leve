import Modal from "react-native-modal";
import { colors } from "../../../../../styles/colors";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";

interface DeleteWeightModalProps {
  message: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteWeightModal(props: DeleteWeightModalProps) {
  const { message, isVisible, onConfirm, onCancel } = props;
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
          <Text style={styles.title}>Confirmar exclusão do registo de peso</Text>
          <Text style={styles.paragraph}>{message}</Text>
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
    </View>
  );
}
