import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ZodHelper } from "../../utils/zod/helpers";
import { BadRequestException } from "../../@core/exception/http/BadRequestException";
import { exceptionResponseAdapter } from "../../utils/express/helpers";

export function validationMiddleware(zodSchema: ZodSchema) {
  const resource = "ValidationMiddleware";

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = zodSchema.safeParse(req.body);

      if (!validationResult.success) {
        const errors = ZodHelper.formatZodError(validationResult.error);

        throw new BadRequestException(
          errors[0].message,
          resource,
          errors[0].field || undefined
        );
      }

      req.body = validationResult.data;

      next();
    } catch (error: any) {
      return exceptionResponseAdapter({ req, res, exception: error });
    }
  };
}
