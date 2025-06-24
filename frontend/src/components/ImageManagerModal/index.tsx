import { useState } from "react";
import { Modal } from "../Modal";
import { DeleteImageBody } from "./components/DeleteImageBody";
import { MainBody } from "./components/MainBody";
import { ModalAction } from "./types";
import { delay } from "../../utils/helpers";
import { ANIMATION_OUT_DURATION } from "../Modal/constants";
import { AccessCameraBody } from "./components/AccessCameraBody";

interface ImageManagerModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export function ImageManagerModal(props: ImageManagerModalProps) {
  const { isVisible, closeModal } = props;
  const [selectedAction, setSelectedAction] = useState<ModalAction | null>(null);

  function onResetModal() {
    setSelectedAction(null);
  }

  function onCloseModal() {
    closeModal();
    delay(ANIMATION_OUT_DURATION).then(() => setSelectedAction(null));
  }

  function onSelectAction(option: ModalAction) {
    setSelectedAction(option);
  }

  return (
    <Modal isVisible={isVisible}>
      {selectedAction === null || selectedAction === "PICK_IMAGE" ? (
        <MainBody
          selectedAction={selectedAction}
          onClose={onCloseModal}
          onHandleAction={onSelectAction}
        />
      ) : null}

      {selectedAction === "ACCESS_CAMERA" ? (
        <AccessCameraBody onBack={onResetModal} onClose={onCloseModal} onConfirm={() => {}} />
      ) : null}

      {selectedAction === "DELETE_IMAGE" ? (
        <DeleteImageBody onBack={onResetModal} onClose={onCloseModal} onConfirm={() => {}} />
      ) : null}
    </Modal>
  );
}
