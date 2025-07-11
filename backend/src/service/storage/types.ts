export interface UploadAssetDTO {
  bucketName: string;
  path: string;
  fileBuffer: Buffer;
  mimetype: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface DeleteFolderDTO {
  bucketName: string;
  folderPath: string;
}

export interface GetFilesDTO {
  bucketName: string;
  folderPath: string;
}

export interface DeleteFilesDTO {
  bucketName: string;
  pathList: string[];
}
