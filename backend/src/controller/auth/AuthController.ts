import { Request, Response } from "express";
import UserService from "../../service/user/UserService";
import { compareHash, hashString } from "../../utils/bcrypt/helpers";
import { generateToken } from "../../utils/jwt/helpers";
import { UnauthorizedException } from "../../@core/exception/http/UnauthorizedException";
import { ConflictException } from "../../@core/exception/http/ConflictException";
import { exceptionResponseAdapter } from "../../utils/express/helpers";

export class AuthController {
  private _userService = new UserService();

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const foundUser = await this._userService.getUserByEmail(email);
      const notFoundMessage = "Email ou senha incorretos.";

      if (!foundUser) {
        throw new UnauthorizedException(
          notFoundMessage,
          AuthController.name,
          "password"
        );
      }

      const isPasswordCorrect = await compareHash(password, foundUser.password);
      if (!isPasswordCorrect) {
        throw new UnauthorizedException(
          notFoundMessage,
          AuthController.name,
          "password"
        );
      }

      const tokenPayload = { userId: foundUser.id, email: foundUser.email };
      const accessToken = generateToken(tokenPayload);
      const response = { id: foundUser.id, token: accessToken };
      return res.status(200).json({ data: response });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro durante o processo de login.",
      });
    }
  }

  async signup(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const foundUser = await this._userService.getUserByEmail(email);
      if (foundUser) {
        throw new ConflictException(
          `Já existe um usuário cadastro com email: ${email}.`,
          AuthController.name,
          "Email"
        );
      }

      const hashedPassword = await hashString(password);
      const createdUser = await this._userService.create({
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ data: createdUser });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro durante o processo de cadastro de usuário.",
      });
    }
  }
}
