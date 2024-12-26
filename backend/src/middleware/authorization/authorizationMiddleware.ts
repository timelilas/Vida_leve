import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/jwt/helpers";
import { UnauthorizedException } from "../../@core/exception/http/UnauthorizedException";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import User from "../../database/models/User";

export const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const foundUser = await User.findOne({ where: { id: userId } });

    if (!foundUser) {
      throw new UnauthorizedException(
        `Usuário com id: ${tokenPayload.userId} não encontrado.`,
        resource,
        "id"
      );
    }

    req.user = { id: tokenPayload.userId, email: tokenPayload.email };

    return next();
  } catch (error: any) {
    return exceptionResponseAdapter({ req, res, exception: error });
  }
};
