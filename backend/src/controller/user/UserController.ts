import { Request, Response } from "express";
import UserService from "../../service/user/UserService";
import { NotFoundException } from "../../@core/exception/http/NotFoundException";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import { SupabaseStorageService } from "../../service/storage/SupabaseStorageService";
import { v4 as uuidv4 } from "uuid";
import { BadRequestException } from "../../@core/exception/http/BadRequestException";

export default class UserController {
  private _userService = new UserService();
  private _storageService = new SupabaseStorageService();
  private _profileImageBucketName = process.env
    .SUPABASE_PROFILE_IMAGE_BUCKET_NAME as string;

  async update(req: Request, res: Response): Promise<Response> {
    const { name, phone, birthDate, gender } = req.body;
    const { id } = req.user;

    try {
      const updateUserParams = {
        id,
        name,
        phone,
        birthDate: new Date(birthDate),
        gender,
      };
      const foundUser = await this._userService.update(updateUserParams);

      if (!foundUser) {
        throw new NotFoundException(
          `Usuário com id '${id}' não encontrado.`,
          UserController.name
        );
      }

      return res.status(200).json({ data: foundUser });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao atualizar os dados do usuário.",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    try {
      const foundUser = await this._userService.get(req.user.id);

      if (!foundUser) {
        throw new NotFoundException(
          `Usuário com id '${userId}' não encontrado.`,
          UserController.name
        );
      }

      return res.status(200).json({ data: foundUser });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao obter o perfil do usuário.",
      });
    }
  }

  async setProfileImage(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const file = req.file;

    try {
      if (!file) {
        throw new BadRequestException(
          "Nenhum arquivo enviado.",
          UserController.name,
          "file"
        );
      }

      const previousImages = await this._storageService.listFiles({
        bucketName: this._profileImageBucketName,
        folderPath: `${userId}`,
      });

      const imageTimestamp = Date.now();
      const imagePath = `${userId}/${uuidv4()}-${imageTimestamp}`;
      const uploadedImage = await this._storageService.uploadAsset({
        bucketName: this._profileImageBucketName,
        fileBuffer: file.buffer,
        mimetype: file.mimetype,
        path: imagePath,
        metadata: {
          user_id: `${userId}`,
          timestamp: imageTimestamp,
        },
      });

      await this._userService.update({
        id: userId,
        imageUrl: uploadedImage.url,
      });

      try {
        if (previousImages.length) {
          const previousImagePaths = previousImages.map(
            ({ name }) => `${userId}/${name}`
          );

          this._storageService.deleteFiles({
            bucketName: this._profileImageBucketName,
            pathList: previousImagePaths,
          });
        }
      } catch (error: any) {
        console.log(error);
      }

      return res.status(201).json({ data: { imageUrl: uploadedImage.url } });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao tentar atualizar a imagem de perfil.",
      });
    }
  }

  async deleteProfileImage(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    try {
      const foundUser = await this._userService.get(userId);

      if (!foundUser) {
        throw new NotFoundException(
          `Usuário com id '${userId}' não encontrado.`,
          UserController.name
        );
      }

      if (!foundUser.imageUrl) {
        throw new NotFoundException(
          `Imagem de perfil do usuário '${userId} não encontrada'`,
          UserController.name
        );
      }

      await this._userService.update({ id: userId, imageUrl: null });

      await this._storageService.deleteFolder({
        bucketName: this._profileImageBucketName,
        folderPath: `${userId}`,
      });

      return res.status(204).send();
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao tentar atualizar a imagem de perfil.",
      });
    }
  }
}
