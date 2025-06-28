export interface ImageInfo {
  uri: string;
  fileName?: string;
  size?: number;
  mimeType?: string;
  isBase64?: boolean;
}

export type ModalAction = "ACCESS_CAMERA" | "PICK_IMAGE" | "DELETE_IMAGE";

export type MediaErrorCode =
  | "UNKNOWN_TYPE"
  | "FILE_TOO_LARGE"
  | "MEDIA_SELECTION_CANCELED"
  | "CAMERA_PERMISSION_DENIED"
  | "MEDIA_UPLOAD_FAILED"
  | "MEDIA_DELETE_FAILED";
