import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private _userService = new UserService();

  async post(req: Request, res: Response): Promise<Response> {
    const { userName, email, password } = req.body;

    try {
      const { type, message } = await this._userService.post(userName || '', email, password);
      return res.status(type).json(message);
    } catch (error) {
      console.error('Error in UserController:', error);
      return res.status(500).json({ error: 'Error creating user' });
    }
  }

  async login (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const { type, message } = await this._userService.login(email, password);
      return res.status(type).json(message);
    } catch (error) {
      console.error('Error in UserController:', error);
      return res.status(500).json({ error: 'Error logging in' });
    }
  }
}
