import { ExternalServiceException } from "../../@core/exception/infrastructure/ExternalServiceException";
import { supabase } from "./config";
import {
  DeleteFilesDTO,
  DeleteFolderDTO,
  GetFilesDTO,
  UploadAssetDTO,
} from "./types";
import { FileObject } from "@supabase/storage-js";

export class SupabaseStorageService {
  async uploadAsset(
    params: UploadAssetDTO
  ): Promise<{ path: string; url: string }> {
    const { bucketName, fileBuffer, mimetype, path, metadata } = params;

    const fileExt = mimetype.split("/")[1] || "jpg";
    const filePath = `${path}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType: mimetype,
        metadata: metadata,
      });

    if (error)
      throw new ExternalServiceException(
        `Erro ao fazer upload do arquivo: '${filePath}'`,
        SupabaseStorageService.name,
        error.message
      );

    try {
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(data.path);

      return { url: publicUrl, path: data.path };
    } catch (error: any) {
      throw new ExternalServiceException(
        `Erro ao tentar obter a url do arquivo: '${filePath}'`,
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

  async listFiles(params: GetFilesDTO): Promise<FileObject[]> {
    const { bucketName, folderPath } = params;
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath);

    if (error) {
      throw new ExternalServiceException(
        `Erro ao listar os arquivos no caminho: '${folderPath}'`,
        SupabaseStorageService.name,
        error.message
      );
    }

    return data;
  }

  async deleteFiles(params: DeleteFilesDTO): Promise<void> {
    const { bucketName, pathList } = params;
    const { error } = await supabase.storage.from(bucketName).remove(pathList);

    if (error) {
      throw new ExternalServiceException(
        `Erro ao remover os arquivos nos diretórios: '${pathList.join(",")}'`,
        SupabaseStorageService.name,
        error.message
      );
    }
  }
}
