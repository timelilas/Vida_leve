import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styles as commonStyles } from "../../styles";
import { styles } from "./styles";
import { CloseIcon } from "../../../Icons/CloseIcon";
import { Paragraph } from "../../../Paragraph/Paragraph";
import { ModalContainer } from "../ModalContainer";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../../../../styles/colors";
import { LoadingOverlay } from "../../../LoadingOverlay";

interface AccessCameraBodyProps {
  onClose: () => void;
  onBack: () => void;
  onSubmit: (cameraRef: CameraView) => Promise<void>;
  isSubmitting: boolean;
}

export function AccessCameraBody(props: AccessCameraBodyProps) {
  const { isSubmitting, onClose, onBack, onSubmit } = props;
  const cameraRef = useRef<CameraView | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraPermissions] = useCameraPermissions();

  const cameraReference = cameraRef.current;
  const isConfirmButtonDisabled = !cameraPermissions || !isCameraReady || isSubmitting;

  useEffect(() => {
    return () => {
      if (Platform.OS === "web" && cameraReference) {
        const video = document.querySelector("video");
        if (!video) return;

        const mediaStream = video.srcObject;
        if (!mediaStream || !(mediaStream instanceof MediaStream)) return;

        mediaStream.getTracks().map((track) => {
          track.stop();
          track.enabled = false;
        });

        video.srcObject = null;
      }
    };
  }, [cameraReference]);

  async function takePicture() {
    if (!cameraPermissions || !isCameraReady || !cameraRef.current) return;
    await onSubmit(cameraRef.current);
  }

  function renderCameraView() {
    if (cameraPermissions && cameraPermissions.granted) {
      return (
        <CameraView
          mute
          ref={cameraRef}
          style={styles.cameraView}
          facing="front"
          onCameraReady={() => setIsCameraReady(true)}
        />
      );
    }

    if (!cameraPermissions || !isCameraReady) {
      return (
        <View style={styles.cameraLoadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (cameraPermissions && !cameraPermissions.granted) {
      return (
        <>
          <View style={styles.horizontalLine} />
          <View style={styles.verticalLine} />
        </>
      );
    }
  }

  return (
    <ModalContainer>
      <Paragraph style={commonStyles.paragraph}>
        A câmera está pronta! Capture a melhor versão de você.
      </Paragraph>
      <View style={styles.cameraViewContainer}>{renderCameraView()}</View>
      <View style={styles.actionsWrapper}>
        <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onBack}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Voltar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.button, isConfirmButtonDisabled && styles.buttonDisabled]}
          onPress={takePicture}>
          <View style={[styles.actionButton, styles.actionButtonFilled]}>
            <Text style={styles.actionButtonText}>Tirar foto agora</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={commonStyles.closeButton} onPress={onClose}>
        <CloseIcon />
      </TouchableOpacity>
      {isSubmitting ? <LoadingOverlay /> : null}
    </ModalContainer>
  );
}
