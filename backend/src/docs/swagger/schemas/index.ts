import { userSchema } from "./user";
import { errorResponseSchema } from "./errorResponse";
import { foodSchema } from "./food";
import { progressSchema } from "./progress";
import { caloriePlanSchema } from "./caloriePlan";

const errorSchemas = {
  ErrorResponse: errorResponseSchema,
};

const entitySchemas = {
  User: userSchema,
  Progress: progressSchema,
  CaloriePlan: caloriePlanSchema,
  Food: foodSchema,
};

export const swaggerSchemas = {
  ...entitySchemas,
  ...errorSchemas,
};
