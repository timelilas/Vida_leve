import { Request, Response } from 'express';
import UserService from '../service/user/UserService';

export default class UserController {
  private _userService = new UserService();

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const profiles = await this._userService.getAll();
      return res.status(200).json({data: profiles});
    } catch (error) {
      console.error('Server internal error:', error);
      return res.status(500).json({ error: 'Erro ao obter a lista de usuários' });
    }
  };

  async put (req: Request, res: Response): Promise<Response> {
    const { userName, telefone, aniversario, sexo} = req.body;
    const { id } = req.user

    try {
      const foundUser = await this._userService.update({id, userName, telefone, aniversario, sexo});

      if(!foundUser){
        return res.status(404).json({error: `Usuário com id ${id} não encontrado`})
      }

      return res.status(200).json({data: foundUser})
    } catch (error) {
      console.error('Server internal error:', error);
      return res.status(500).json({ error: 'Erro ao atualizar os dados do usuário' });
    }
  };

  async getById(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id
    try {
      const foundUser = await this._userService.get(req.user.id);

      if(!foundUser){
        return res.status(404).json({error: `Usuário com id ${userId} não encontrado`})
      }

      return res.status(200).json({data: foundUser});
    } catch (error) {
      console.error('Server internal error:', error);
      return res.status(500).json({ error: 'Erro ao obter o perfil do usuário' });
    }
  };

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const deletedUser = await this._userService.delete(Number(id));

      if(!deletedUser){
        return res.status(404).json({error: `Usuário com id ${id} não encontrado`})
      }
      return res.status(200).json({data: "Usuário deletado com sucesso"});
    } catch (error) {
      console.error('Server internal error:', error);
      return res.status(500).json({ error: 'Erro ao deletar o usuário' });
    }
  };
}