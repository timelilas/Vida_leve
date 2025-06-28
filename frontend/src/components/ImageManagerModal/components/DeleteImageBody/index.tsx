import { Text, TouchableOpacity, View } from "react-native";
import { styles as commonStyles } from "../../styles";
import { styles } from "./styles";
import { WarningIcon } from "../../../Icons/WarningIcon";
import { Paragraph } from "../../../Paragraph/Paragraph";
import { CloseIcon } from "../../../Icons/CloseIcon";
import { ModalContainer } from "../ModalContainer";
import { LoadingOverlay } from "../../../LoadingOverlay";

interface DeleteImageBodyProps {
  onDeleteImage: () => void;
  onBack: () => void;
  onClose: () => void;
  isDeleting: boolean;
}

export function DeleteImageBody(props: DeleteImageBodyProps) {
  const { isDeleting, onBack, onClose, onDeleteImage } = props;

  function goBack() {
    if (isDeleting) return;
    onBack();
  }

  function close() {
    if (isDeleting) return;
    onClose();
  }

  return (
    <ModalContainer style={commonStyles.container}>
      <View style={styles.titleContainer}>
        <WarningIcon />
        <Text style={styles.title}>Confirmar exclusão da foto de perfil</Text>
      </View>
      <Paragraph style={commonStyles.paragraph}>
        Tem certeza de que deseja remover sua foto de perfil? Ela será substituída pela imagem
        padrão.
      </Paragraph>
      <View style={styles.actionsWrapper}>
        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={goBack}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Voltar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onDeleteImage}>
          <View style={[styles.actionButton, styles.actionButtonFilled]}>
            <Text style={styles.actionButtonText}>Sim, remover</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={commonStyles.closeButton} onPress={close}>
        <CloseIcon />
      </TouchableOpacity>
      {isDeleting ? <LoadingOverlay /> : null}
    </ModalContainer>
  );
}
