import { Pressable, StyleSheet, Text, View } from "react-native";
import { SuccessCheckIcon } from "../icons/SuccessCheckIcon";
import { CloseIcon } from "../icons/CloseIcon";
import Modal from "react-native-modal";

interface SuccessModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function SuccessModal(props: SuccessModalProps) {
  const { message, isVisible, onClose } = props;

  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={500}
      animationIn="zoomIn"
      animationOut="fadeOutUpBig"
      backdropColor="#000000"
      backdropOpacity={0.2}
      isVisible={isVisible}
      style={styles.container}
    >
      <View style={styles.modal}>
        <SuccessCheckIcon style={styles.checkIcon} />
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <CloseIcon stroke="#4E4B66" />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  modal: {
    position: "relative",
    width: "100%",
    maxWidth: 390,
    minHeight: 170,
    backgroundColor: "#eff0f6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#14ae5c",
    borderRadius: 8,
    padding: 24,
  },
  message: {
    color: "#4e4b66",
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: "Roboto-700",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  checkIcon: {
    position: "absolute",
    top: 0,
    transform: [{ translateY: "-50%" }],
  },
});
