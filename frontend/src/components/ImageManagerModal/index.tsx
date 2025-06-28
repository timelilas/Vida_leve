import { useState } from "react";
import { Modal } from "../Modal";
import { DeleteImageBody } from "./components/DeleteImageBody";
import { MainBody } from "./components/MainBody";
import { MediaErrorCode, ModalAction } from "./types";
import { delay, parseBase64String } from "../../utils/helpers";
import { ANIMATION_OUT_DURATION } from "../Modal/constants";
import { AccessCameraBody } from "./components/AccessCameraBody";
import * as ExpoImagePicker from "expo-image-picker";
import * as ExpoFileSystem from "expo-file-system";
import mime from "mime";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useUser } from "../../hooks/user/useUser";
import { MAX_PROFILE_IMAGE_SIZE } from "../../constants/fileConstants";
import { ImageInfo } from "./types";
import { Platform } from "react-native";
import { useImageFile } from "./hooks/useImageFile";

interface ImageManagerModalProps {
  isVisible: boolean;
  onCloseModel: () => void;
  onFailed: (code: MediaErrorCode) => void;
  onSuccess: (action: ModalAction) => void;
}

export function ImageManagerModal(props: ImageManagerModalProps) {
  const { isVisible, onCloseModel, onSuccess, onFailed } = props;
  const [selectedAction, setSelectedAction] = useState<ModalAction | null>(null);
  const { imageDataToFile, base64ImageToFile } = useImageFile();
  const requestCameraPermission = useCameraPermissions()[1];

  const {
    user,
    isSettingProfileImage,
    isDeletingProfileImage,
    setProfileImage,
    deleteProfileImage
  } = useUser({
    refetchOnMount: false
  });

  function resetModal() {
    setSelectedAction(null);
  }

  function closeModal() {
    onCloseModel();
    delay(ANIMATION_OUT_DURATION).then(() => setSelectedAction(null));
  }

  async function pickImageFromGallery() {
    const selectedAsset = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      aspect: [4, 4]
    });
    return selectedAsset;
  }

  async function handleImageUpload(image: ImageInfo) {
    const { uri, fileName, mimeType, size, isBase64 } = image;
    const isWeb = Platform.OS === "web";
    const isMobile = Platform.OS === "ios" || Platform.OS === "android";

    if (!mimeType) {
      onFailed("UNKNOWN_TYPE");
      return false;
    }

    if (size && size > MAX_PROFILE_IMAGE_SIZE) {
      onFailed("FILE_TOO_LARGE");
      return false;
    }

    const imageExtension = mime.getExtension(mimeType) || "jpeg";
    const sanitizedFileName = fileName || `profile-image-${Date.now()}.${imageExtension}`;

    if (isMobile) {
      await setProfileImage({
        platform: "mobile",
        data: { name: sanitizedFileName, type: mimeType, uri }
      });
    }

    if (isWeb) {
      if (!isBase64) {
        await setProfileImage({
          platform: "web",
          data: await imageDataToFile({ fileName: sanitizedFileName, mimeType, uri })
        });
      }

      const imageFile = base64ImageToFile({ base64: image.uri, fileName: sanitizedFileName });

      if (imageFile.size > MAX_PROFILE_IMAGE_SIZE) {
        onFailed("FILE_TOO_LARGE");
        return false;
      }

      await setProfileImage({
        platform: "web",
        data: imageFile
      });
    }

    return true;
  }

  async function handleImagePicking() {
    if (isSettingProfileImage) return;
    setSelectedAction("PICK_IMAGE");

    try {
      const { canceled, assets } = await pickImageFromGallery();
      if (canceled) {
        return setSelectedAction(null);
      }

      const { mimeType, uri, fileSize } = assets[0];
      const successUpload = await handleImageUpload({
        uri,
        mimeType,
        size: fileSize
      });

      if (successUpload) {
        onSuccess("PICK_IMAGE");
        closeModal();
      } else {
        setSelectedAction(null);
      }
    } catch {
      setSelectedAction(null);
      onFailed("MEDIA_UPLOAD_FAILED");
    }
  }

  async function handleImageDelete() {
    if (isDeletingProfileImage || !user.imageUrl) return;
    try {
      await deleteProfileImage();
      closeModal();
      onSuccess("DELETE_IMAGE");
    } catch {
      onFailed("MEDIA_DELETE_FAILED");
    }
  }

  async function handleCameraAccess() {
    const cameraAccess = await requestCameraPermission();

    if (cameraAccess.granted) {
      return setSelectedAction("ACCESS_CAMERA");
    } else {
      onFailed("CAMERA_PERMISSION_DENIED");
      return setSelectedAction(null);
    }
  }

  async function handleCameraCapture(cameraRef: CameraView) {
    if (isSettingProfileImage) return;

    try {
      let successUpload = false;
      const image = await cameraRef.takePictureAsync({ quality: 1, isImageMirror: true });

      if (!image) {
        return onFailed("MEDIA_UPLOAD_FAILED");
      }

      if (Platform.OS === "android" || Platform.OS === "ios") {
        const imageInfo = await ExpoFileSystem.getInfoAsync(image.uri, { size: true });
        const mimeType = mime.getType(image.uri);

        if (!imageInfo.exists) {
          return onFailed("MEDIA_UPLOAD_FAILED");
        }

        successUpload = await handleImageUpload({
          uri: imageInfo.uri,
          mimeType: mimeType || undefined,
          size: imageInfo.size
        });

        ExpoFileSystem.deleteAsync(imageInfo.uri, { idempotent: true }).catch((error) => {
          console.log(error);
        });
      }

      if (Platform.OS === "web") {
        const { mimeType } = parseBase64String(image.uri);
        successUpload = await handleImageUpload({
          mimeType,
          uri: image.uri,
          isBase64: true
        });
      }

      if (successUpload) {
        onSuccess("ACCESS_CAMERA");
        closeModal();
      }
    } catch {
      onFailed("MEDIA_UPLOAD_FAILED");
    }
  }

  async function onHandleAction(action: ModalAction) {
    if (action === "DELETE_IMAGE") return setSelectedAction("DELETE_IMAGE");
    if (action === "PICK_IMAGE") return await handleImagePicking();
    if (action === "ACCESS_CAMERA") return await handleCameraAccess();
  }

  return (
    <Modal isVisible={isVisible}>
      {selectedAction === null || selectedAction === "PICK_IMAGE" ? (
        <MainBody
          selectedAction={selectedAction}
          isUpdatingProfileImage={isSettingProfileImage}
          onClose={closeModal}
          onHandleAction={onHandleAction}
        />
      ) : null}

      {selectedAction === "ACCESS_CAMERA" ? (
        <AccessCameraBody
          onBack={resetModal}
          onClose={closeModal}
          onSubmit={handleCameraCapture}
          isSubmitting={isSettingProfileImage}
        />
      ) : null}

      {selectedAction === "DELETE_IMAGE" ? (
        <DeleteImageBody
          onBack={resetModal}
          onClose={closeModal}
          onDeleteImage={handleImageDelete}
          isDeleting={isDeletingProfileImage}
        />
      ) : null}
    </Modal>
  );
}
