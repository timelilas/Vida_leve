import { Request, Response } from "express";
import { UserPhotoService } from "../../service/UserPhotoService/UserPhotoService";

const service = new UserPhotoService();

export default class UserPhotoController {
  async uploadPhoto(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado." });
      }

      const imageUrl = await service.uploadUserPhoto(userId, file.buffer, file.mimetype);

      return res.status(201).json({
        message: "Foto enviada com sucesso!",
        imageUrl,
      });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserPhoto(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const userPhoto = await service.getUserPhoto(userId);

      if (!userPhoto) {
        return res.status(404).json({ error: "Foto do usuário não encontrada." });
      }

      return res.status(200).json({
        message: "Foto obtida com sucesso!",
        photoUrl: userPhoto.photoUrl,
      });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteUserPhoto(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const result = await service.deleteUserPhoto(userId);

      if (!result) {
        return res.status(404).json({ error: "Foto do usuário não encontrada." });
      }

      return res.status(200).json({ message: "Foto deletada com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}
