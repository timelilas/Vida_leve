import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/jwt/helpers";
import { UnauthorizedException } from "../../@core/exception/http/UnauthorizedException";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import UserService from "../../service/user/UserService";

class AuthorizationMiddleware {
  private readonly _userService = new UserService();

  public async execute(req: Request, res: Response, next: NextFunction) {
    const resource = "AuthorizationMiddleware";
    const authorizationHeader = req.headers["authorization"];
    const accessToken = authorizationHeader?.split(" ")[1];
    const unauthorizedMessage = "Usuário não autorizado ou token inválido.";

    try {
      if (!accessToken) {
        throw new UnauthorizedException(unauthorizedMessage, resource);
      }

      const tokenPayload = verifyToken(accessToken);
      if (!tokenPayload) {
        throw new UnauthorizedException(unauthorizedMessage, resource);
      }

      const userId = tokenPayload.userId;

      const foundUser = await this._userService.get(userId);

      if (!foundUser) {
        throw new UnauthorizedException(
          `Usuário com id: ${tokenPayload.userId} não encontrado.`,
          resource
        );
      }

      req.user = { id: tokenPayload.userId };

      return next();
    } catch (error: any) {
      return exceptionResponseAdapter({ req, res, exception: error });
    }
  }
}

export const authorizationMiddleware = new AuthorizationMiddleware();
