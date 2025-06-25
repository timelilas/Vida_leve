import { parseBase64String } from "../../../utils/helpers";

interface ImageDataToFileParams {
  uri: string;
  fileName: string;
  mimeType: string;
}

interface Base64ImageDataToFile {
  base64: string;
  fileName: string;
}

export function useImageFile() {
  async function imageDataToFile(params: ImageDataToFileParams) {
    const { fileName, uri, mimeType } = params;

    const imageBlob = await (await fetch(uri)).blob();
    const imageFile = new File([imageBlob], fileName, { type: mimeType });

    return imageFile;
  }

  function base64ImageToFile(params: Base64ImageDataToFile) {
    const { base64, fileName } = params;

    const { data, mimeType } = parseBase64String(base64);

    const byteString = atob(data);
    const byteNumbers = new Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: mimeType });
  }

  return {
    imageDataToFile,
    base64ImageToFile
  };
}
