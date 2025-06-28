import { Text, TouchableOpacity, View } from "react-native";
import { ToggleButton } from "../../../ToggleButton";
import { CloseIcon } from "../../../Icons/CloseIcon";
import { styles } from "./styles";
import { styles as commonStyles } from "../../styles";
import { ColoredCameraIcon } from "../../../Icons/ColoredCameraIcon";
import { PickImageIcon } from "../../../Icons/PickImageIcon";
import { ColoredTrashIcon } from "../../../Icons/ColoredTrashIcon";
import { ModalAction } from "../../types";
import { Paragraph } from "../../../Paragraph/Paragraph";
import { useState } from "react";
import { useUser } from "../../../../hooks/user/useUser";
import { LoadingOverlay } from "../../../LoadingOverlay";

interface MainBodyProps {
  isUpdatingProfileImage?: boolean;
  selectedAction: ModalAction | null;
  onHandleAction: (action: ModalAction) => void;
  onClose: () => void;
}

export function MainBody(props: MainBodyProps) {
  const { onClose, onHandleAction, selectedAction, isUpdatingProfileImage } = props;
  const [currentPressingOption, setCurrentPressingOption] = useState<string | null>(null);
  const { user } = useUser({ refetchOnMount: false });

  const buttons = [
    {
      id: "1",
      Icon: ColoredCameraIcon,
      title: "Acessar câmera",
      text: "Tire uma nova foto agora.",
      action: "ACCESS_CAMERA",
      disabled: false
    },
    {
      id: "2",
      Icon: PickImageIcon,
      title: "Importar da galeria",
      text: "Escolha uma imagem do seu dispositivo.",
      action: "PICK_IMAGE",
      disabled: false
    },
    {
      id: "3",
      Icon: ColoredTrashIcon,
      title: "Excluir foto atual",
      text: "Remova a foto e volte ao padrão.",
      action: "DELETE_IMAGE",
      disabled: user.imageUrl ? false : true
    }
  ] as const;

  function handleAction(action: ModalAction) {
    if (action === "DELETE_IMAGE" && !user.imageUrl) return;
    onHandleAction(action);
  }

  return (
    <View style={commonStyles.container}>
      <Paragraph style={commonStyles.paragraph}>
        Escolha uma imagem que melhor represente você! Carregue uma nova foto ou remova a atual
        para voltar ao padrão.
      </Paragraph>
      <View style={styles.optionsWrapper}>
        {buttons.map((button) => {
          return (
            <ToggleButton
              key={button.id}
              onPressIn={() => setCurrentPressingOption(button.id)}
              onPressOut={() => setCurrentPressingOption(null)}
              onPress={() => handleAction(button.action)}
              disabled={button.disabled}
              selected={
                button.action === selectedAction || button.id === currentPressingOption
              }>
              <View style={styles.optionButton}>
                <button.Icon />
                <View style={styles.optionButtonTextContainer}>
                  <Text style={styles.optionButtonTitle}>{button.title}</Text>
                  <Text style={styles.optionButtonText}>{button.text}</Text>
                </View>
              </View>
            </ToggleButton>
          );
        })}
      </View>
      <TouchableOpacity style={commonStyles.closeButton} onPress={onClose}>
        <CloseIcon />
      </TouchableOpacity>
      {isUpdatingProfileImage ? <LoadingOverlay /> : null}
    </View>
  );
}
