import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private _userService = new UserService();

  async post(req: Request, res: Response): Promise<Response> {
    const { userName, email, senha } = req.body;

    try {
      const { type, message } = await this._userService.post(userName || '', email, senha);
      return res.status(type).json(message);
    } catch (error) {
      console.error('Error in UserController:', error);
      return res.status(500).json({ error: 'Error creating user' });
    }
  }

  async login (req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    try {
      const { type, message } = await this._userService.login(email, senha);
      return res.status(type).json(message);
    } catch (error) {
      console.error('Error in UserController:', error);
      return res.status(500).json({ error: 'Error logging in' });
    }
  }

  async put (req: Request, res: Response): Promise<Response> {
    const { userName, telefone, aniversario, sexo} = req.body;
    const { id } = req.params;

    try {
      const { type, message } = await this._userService.put(Number(id), userName, telefone, aniversario, sexo);
      return res.status(type).json(message)
    } catch (error) {
      console.error('Error in UserController:', error);
      return res.status(500).json({ error: 'Error creating user' });
    }
  }
}
