import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ZodHelper } from "../../utils/zod/helpers";
import { BadRequestException } from "../../@core/exception/http/BadRequestException";
import { exceptionResponseAdapter } from "../../utils/express/helpers";

export function validationMiddleware(
  zodSchema: ZodSchema,
  target: "body" | "query"
) {
  const resource = "ValidationMiddleware";

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationTarget = target === "body" ? req.body : req.query;
      const validationResult = zodSchema.safeParse(validationTarget);

      if (!validationResult.success) {
        const errors = ZodHelper.formatZodError(validationResult.error);

        throw new BadRequestException(
          errors[0].message,
          resource,
          errors[0].field || undefined
        );
      }

      if (target === "body") {
        req.body = validationResult.data;
      }

      if (target === "query") {
        req.query = validationResult.data;
      }

      next();
    } catch (error: any) {
      return exceptionResponseAdapter({ req, res, exception: error });
    }
  };
}
