import { userSchema } from "./user";
import { errorResponseSchema } from "./errorResponse";
import { foodSchema } from "./food";
import { progressSchema } from "./progress";

const errorSchemas = {
  ErrorResponse: errorResponseSchema,
};

const entitySchemas = {
  User: userSchema,
  Progress: progressSchema,
  Food: foodSchema,
};

export const swaggerSchemas = {
  ...entitySchemas,
  ...errorSchemas,
};
