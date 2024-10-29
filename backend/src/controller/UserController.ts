import { Request, Response } from 'express';
import UserService from '../service/user/UserService';

export default class UserController {
  private _userService = new UserService();

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { type, message } = await this._userService.getAll();
      return res.status(type).json(message);
    } catch (error) {
      console.error('Server internal error:', error);
      return res.status(500).json({ error: 'Erro ao obter a lista de usuários' });
    }
  };

  async put (req: Request, res: Response): Promise<Response> {
    const { userName, telefone, aniversario, sexo} = req.body;
    const { id } = req.params;

    try {
      const { type, message } = await this._userService.update({id, userName, telefone, aniversario, sexo});
      return res.status(type).json(message)
    } catch (error) {
      console.error('Server internal error:', error);
      return res.status(500).json({ error: 'Erro ao atualizar os dados do usuário' });
    }
  };

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const { type, message } = await this._userService.delete(Number(id));
      return res.status(type).json(message);
    } catch (error) {
      console.error('Server internal error:', error);
      return res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
  };
}