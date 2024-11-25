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
        return res.status(401).json({
          error: {
            field: "all",
            message:
              "Ops! Parece que o e-mail ou a senha estão incorretos. Confira os dados e tente novamente.",
          },
        });
      }

      const isPasswordCorrect = await compareHash(password, foundUser.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({
          error: {
            field: "all",
            message:
              "Ops! Parece que o e-mail ou a senha estão incorretos. Confira os dados e tente novamente.",
          },
        });
      }

      const accessToken = generateToken({
        userId: foundUser.id,
        email: foundUser.email,
      });
      const response = { id: foundUser.id, token: accessToken };
      return res.status(200).json({ data: response });
    } catch (error) {
      console.error("Server internal error:", error);
      return res.status(500).json({
        error: { field: null, message: "Erro durante o processo de login." },
      });
    }
  }

  async signup(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const foundUser = await this._userService.getUserByEmail(email);
      if (foundUser) {
        return res.status(409).json({
          error: {
            field: "email",
            message: `Já existe um usuário cadastro com email: ${email}.`,
          },
        });
      }

      const hashedPassword = await hashString(password);
      const createdUser = await this._userService.create({
        email,
        password: hashedPassword,
      });

      return res.status(200).json({ data: createdUser });
    } catch (error) {
      console.error("Server internal error:", error);
      return res.status(500).json({
        error: {
          field: null,
          message: "Erro na tentativa de criar um usuário.",
        },
      });
    }
  }
}
