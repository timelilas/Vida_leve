import { userSchema } from "./user";
import { errorResponseSchema } from "./errorResponse";

const errorSchemas = {
  ErrorResponse: errorResponseSchema,
};

const entitySchemas = {
  User: userSchema,
};

export const swaggerSchemas = {
  ...entitySchemas,
  ...errorSchemas,
};
