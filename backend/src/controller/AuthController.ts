import { Request, Response } from "express";
import UserService from "../service/user/UserService";
import { compareHash } from "../utils/bcrypt/helpers";
import { generateToken } from "../utils/jwt/helpers";


export class AuthController{
  private _userService = new UserService();

  async login (req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    try {
      const foundUser = await this._userService.getUserByEmail(email)
      if (!foundUser){
        return res.status(401).json({error: "Email ou senha incorretos"})
      }

      const isPasswordCorrect = await compareHash(senha, foundUser.senha)
      if(!isPasswordCorrect){
        return res.status(401).json({error: "Email ou senha incorretos"})
      }

      const accessToken = generateToken({userId: foundUser.id, email: foundUser.email})
      return res.status(200).json({id: foundUser.id, message: accessToken});
    } catch (error) {
      console.error('Server internal error:', error);
      return res.status(500).json({ error: 'Erro durante o processo de login' });
    }
  };
}