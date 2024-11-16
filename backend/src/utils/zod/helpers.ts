import z, { ZodError } from "zod";
import * as messages from "./messages";

export class ZodHelper {
  public static boolean(field: string) {
    return z.boolean({
      required_error: messages.requiredMsg(field),
      invalid_type_error: messages.booleanMsg(field),
    });
  }

  public static date(field: string) {
    return z.date({
      required_error: messages.requiredMsg(field),
      message: messages.invalidDateMsg(),
    });
  }

  public static number(field: string, min: number, max?: number) {
    const base = z
      .number({
        required_error: messages.requiredMsg(field),
        invalid_type_error: messages.numberMsg(field),
      })
      .gte(min, messages.minSizeMsg(field, min));
    return max ? base.lte(max, messages.maxSizeMsg(field, max)) : base;
  }

  public static string(field: string, min: number, max?: number) {
    return this.baseString(field, min, max).refine(
      (input) => input.replace(/[^À-ú\w]|_/g, "").length >= min,
      { message: `Deve conter no mínimo ${min} caracteres sem símbolos.s` }
    );
  }

  public static email(field: string, max?: number) {
    const baseEmail = z
      .string({
        required_error: messages.requiredMsg(field),
        invalid_type_error: messages.stringMsg(field),
      })
      .email(messages.invalidEmailMsg());
    return max
      ? baseEmail.max(max, messages.maxLengthMsg(field, max))
      : baseEmail;
  }

  public static password(field: string, min: number, max: number) {
    return this.baseString(field, min, max).refine(
      (password) => password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/g),
      {
        message: `${field} deve conter ao menos 1 letra maiúscula, 1 letra minúscula, 1 número, e 1 caractere especial.`,
      }
    );
  }

  public static phone(field: string, length: number) {
    return z
      .string({
        required_error: messages.requiredMsg(field),
        invalid_type_error: messages.stringMsg(field),
      })
      .length(length, messages.lengthMsg(field, length))
      .refine((phone) => phone.match(/^[0-9]+$/g), {
        message: `${field} deve conter apenas caracteres numéricos.`,
      });
  }

  public static formatZodError(error: ZodError) {
    const errors: { field: string | null; message: string }[] = [];
    for (const issue of error.issues) {
      if (issue.path.length) {
        errors.push({ field: issue.path.join("."), message: issue.message });
      } else {
        const key = (issue as { keys: string[] }).keys.join(".");
        const outerField = `${key[0].toUpperCase()}${key.slice(1)}`;
        const message = `${outerField} ${issue.message.toLowerCase()}`;
        errors.push({ field: null, message });
      }
    }

    return errors;
  }

  private static baseString(field: string, min: number, max?: number) {
    const base = z
      .string({
        required_error: messages.requiredMsg(field),
        invalid_type_error: messages.stringMsg(field),
      })
      .min(min, messages.minLengthMsg(field, min));
    return (
      max ? base.max(max, messages.maxLengthMsg(field, max)) : base
    ).trim();
  }
}
