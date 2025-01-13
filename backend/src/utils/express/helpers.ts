import { Request, Response } from "express";
import { Exception } from "../../@core/exception/@shared/Exception";
import { HttpException } from "../../@core/exception/http/HttpException";
import { InternalServerException } from "../../@core/exception/http/InternalServerException";

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
  console.error(exception);

  const internalServerError =
    exception instanceof InternalServerException
      ? exception.message
      : alternativeMsg;

  return res.status(exception.status).json({
    timestamp: exception.timestamp,
    path: exception.path,
    satus: exception.status,
    error: exception.status >= 500 ? internalServerError : exception.message,
    field: exception instanceof HttpException ? exception.field : undefined,
  });
}
