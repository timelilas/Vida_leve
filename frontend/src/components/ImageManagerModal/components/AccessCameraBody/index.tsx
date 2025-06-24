import { Text, TouchableOpacity, View } from "react-native";
import { styles as commonStyles } from "../../styles";
import { styles } from "./styles";
import { CloseIcon } from "../../../Icons/CloseIcon";
import { Paragraph } from "../../../Paragraph/Paragraph";
import { ModalContainer } from "../ModalContainer";

interface AccessCameraBodyProps {
  onClose: () => void;
  onBack: () => void;
  onConfirm: () => void;
}

export function AccessCameraBody(props: AccessCameraBodyProps) {
  const { onClose, onBack, onConfirm } = props;

  return (
    <ModalContainer style={commonStyles.container}>
      <Paragraph style={commonStyles.paragraph}>
        A câmera está pronta! Capture a melhor versão de você.
      </Paragraph>
      <View style={styles.cameraView}>
        <View style={styles.horizontalLine} />
        <View style={styles.verticalLine} />
      </View>
      <View style={styles.actionsWrapper}>
        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onBack}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Voltar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onConfirm}>
          <View style={[styles.actionButton, styles.actionButtonFilled]}>
            <Text style={styles.actionButtonText}>Tirar foto agora</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={commonStyles.closeButton} onPress={onClose}>
        <CloseIcon />
      </TouchableOpacity>
    </ModalContainer>
  );
}
