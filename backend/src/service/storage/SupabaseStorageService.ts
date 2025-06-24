import { ExternalServiceException } from "../../@core/exception/infrastructure/ExternalServiceException";
import { supabase } from "./config";
import { DeleteFolderDTO, UploadAssetDTO } from "./types";

export class SupabaseStorageService {
  async uploadAsset(params: UploadAssetDTO): Promise<string> {
    const { bucketName, fileBuffer, mimetype, path, metadata } = params;

    const fileExt = mimetype.split("/")[1] || "jpg";
    const fullFilePath = `${path}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fullFilePath, fileBuffer, {
        contentType: mimetype,
        metadata: metadata,
      });

    if (error)
      throw new ExternalServiceException(
        `Erro ao fazer upload do arquivo: '${fullFilePath}'`,
        SupabaseStorageService.name,
        error.message
      );

    try {
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(data.fullPath);
      return publicUrl;
    } catch (error: any) {
      throw new ExternalServiceException(
        `Erro ao tentar obter a url do arquivo: '${fullFilePath}'`,
        SupabaseStorageService.name,
        error.message
      );
    }
  }

  async deleteFolder(params: DeleteFolderDTO): Promise<void> {
    const { bucketName, folderPath } = params;
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([folderPath]);

    if (error) {
      throw new ExternalServiceException(
        `Erro durante a remoção da pasta: '${folderPath}'`,
        SupabaseStorageService.name,
        error.message
      );
    }
  }
}
