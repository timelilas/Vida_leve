import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

export function fileUploadMiddleware(fileName: string) {
  return upload.single(fileName);
}
