import { supabase } from "../../config/supabaseClient";
import { UserPhoto } from "../../database/models/UserPhoto";

export class UserPhotoService {
  async uploadUserPhoto(userId: number, fileBuffer: Buffer, mimetype: string): Promise<string> {
    const fileExt = mimetype.split("/")[1] || "jpg";
    const fileName = `user_${userId}_${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("user-photos")
      .upload(fileName, fileBuffer, {
        contentType: mimetype,
        upsert: true,
      });

    if (error) throw new Error(`Erro ao fazer upload no Supabase: ${error.message}`);

    const { data: { publicUrl } } = supabase.storage.from("user-photos").getPublicUrl(fileName);

    if (!publicUrl) throw new Error("Não foi possível gerar a URL pública da foto.");

    await UserPhoto.create({
      userId,
      photoUrl: publicUrl,
    });

    return publicUrl;
  }

  async getUserPhoto(userId: number): Promise<UserPhoto | null> {
    const userPhoto = await UserPhoto.findOne({ where: { userId } });
    return userPhoto;
  }

  async deleteUserPhoto(userId: number): Promise<boolean> {
    const userPhoto = await UserPhoto.findOne({ where: { userId } });

    if (!userPhoto) return false;

    const fileName = userPhoto.photoUrl.split("/").pop();
    if (!fileName) throw new Error("Nome do arquivo não pôde ser extraído da URL da foto.");
    const { error } = await supabase.storage.from("user-photos").remove([fileName]);

    if (error) throw new Error(`Erro ao deletar foto do Supabase: ${error.message}`);

    await UserPhoto.destroy({ where: { userId } });
    return true;
  }
}
