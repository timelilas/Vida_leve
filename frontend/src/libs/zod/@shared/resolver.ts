import { FieldValues, Resolver } from "react-hook-form";
import z from "zod";

export function customZodResolver<TFieldValues extends FieldValues>(
  schema: z.ZodSchema<TFieldValues, any, any>
): Resolver<z.infer<typeof schema>> {
  return (data) => {
    const validationResult = schema.safeParse(data);

    if (validationResult.success) {
      return { errors: {}, values: validationResult.data };
    }

    const shape = schema._def.shape ? schema._def.shape() : schema._def.schema.shape;
    const errors = validationResult.error.flatten().fieldErrors;
    const schemaKeys = Object.keys(shape);

    const errorMap = schemaKeys.reduce(
      (acc, key) => {
        if (errors[key]) {
          acc[key] = { message: errors[key][0] };
        }
        return acc;
      },
      {} as Record<string, { message: string } | undefined>
    );

    return { errors: errorMap as any, values: {} };
  };
}
