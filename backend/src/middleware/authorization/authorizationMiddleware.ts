import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/jwt/helpers";
import User from "../../database/models/User";

export const authorizationMiddleware = async (req: Request, res: Response, next:NextFunction)=>{
  const authorizationHeader = req.headers["authorization"]

  const accessToken = authorizationHeader?.split(" ")[1]
  if(!accessToken){
    return res.status(401).json({error: "Usuário não autorizado ou token inválido"})
  }

  const tokenPayload = verifyToken(accessToken)
  if(!tokenPayload){
    return res.status(401).json({error: "Usuário não autorizado ou token inválido"})
  }

  const foundUser = await User.findOne({where: {id: tokenPayload.userId }})
  if(!foundUser){
    return res.status(401).json({error: "Usuário não encontrado"})
  }

  return next()
}