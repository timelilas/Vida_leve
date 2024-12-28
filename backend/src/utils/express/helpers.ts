import { Request, Response } from "express";
import { Exception } from "../../@core/exception/@shared/Exception";
import { HttpException } from "../../@core/exception/http/HttpException";

interface ExceptionHandlerParams {
  req: Request;
  res: Response;
  exception: Exception;
  alternativeMsg?: string;
}

export function exceptionResponseAdapter({
  req,
  res,
  exception,
  alternativeMsg,
}: ExceptionHandlerParams) {
  exception.path = req.originalUrl;

  //substituir por um serviço de logging futuramente
  console.log(exception);

  return res.status(exception.status).json({
    timestamp: exception.timestamp,
    path: exception.path,
    error: exception.status >= 500 ? alternativeMsg : exception.message,
    field: exception instanceof HttpException ? exception.field || null : null,
  });
}
