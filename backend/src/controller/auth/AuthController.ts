import { Request, Response } from "express";
import UserService from "../../service/user/UserService";
import { compareHash, hashString } from "../../utils/bcrypt/helpers";
import { generateToken } from "../../utils/jwt/helpers";

export class AuthController {
  private _userService = new UserService();

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const foundUser = await this._userService.getUserByEmail(email);
      if (!foundUser) {
        return res.status(401).json({ error: "Email não cadastrado." });
      }

      const isPasswordCorrect = await compareHash(password, foundUser.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Ops! A senha que você digitou está incorreta. Por favor, tente novamente." });
      }

      const accessToken = generateToken({
        userId: foundUser.id,
        email: foundUser.email,
      });
      const response = { id: foundUser.id, token: accessToken };
      return res.status(200).json({ data: response });
    } catch (error) {
      console.error("Server internal error:", error);
      return res
        .status(500)
        .json({ error: "Erro durante o processo de login." });
    }
  }

  async signup(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const foundUser = await this._userService.getUserByEmail(email);
      if (foundUser) {
        return res
          .status(409)
          .json({ error: `Já existe um usuário cadastro com email: ${email}.` });
      }

      const hashedPassword = await hashString(password);
      const createdUser = await this._userService.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(200).json({ data: createdUser });
    } catch (error) {
      console.error("Server internal error:", error);
      return res
        .status(500)
        .json({ error: "Erro na tentativa de criar um usuário." });
    }
  }
}
