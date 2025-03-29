import { Request, Response } from "express";
import UserService from "../../service/user/UserService";
import { NotFoundException } from "../../@core/exception/http/NotFoundException";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import { InternalServerException } from "../../@core/exception/http/InternalServerException";

export default class UserController {
  private _userService = new UserService();

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const profiles = await this._userService.getAll();
      return res.status(200).json({ data: profiles });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao obter a lista de usuários.",
      });
    }
  }

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
        throw new InternalServerException(
          `Usuário com id ${id} não encontrado.`,
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
        throw new InternalServerException(
          `Usuário com id ${userId} não encontrado.`,
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
}
