import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";

export function validatePassword(password: string): ValidationResult {
  if (password.length <= 0) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  if (!validatePasswordLength(password)) {
    return {
      error: "A Senha deve conter pelo menos 8 caracteres de extensão",
      success: false,
    };
  }

  if (!validateLowercasePassword(password)) {
    return {
      success: false,
      error: "A senha deve conter letras minúsculas (a-z)",
    };
  }

  if (!validateUppercasePassword(password)) {
    return {
      success: false,
      error: "A senha deve conter letras maiúsculas (A-Z)",
    };
  }

  if (!validateNumericPassword(password)) {
    return {
      success: false,
      error: "A senha deve conter números (0-9)",
    };
  }

  if (!validatePasswordSymbols(password)) {
    return {
      success: false,
      error: "A senha deve conter caracteres especiais (ex: !@#$%^&*.,)",
    };
  }

  return {
    success: true,
  };
}

export function validatePasswordLength(password: string): boolean {
  return password.length > 7;
}

export function validateUppercasePassword(password: string): boolean {
  return !!password.match(/[A-ZÀ-Ý]/g);
}

export function validateLowercasePassword(password: string): boolean {
  return !!password.match(/[a-zà-ý]/g);
}

export function validateNumericPassword(password: string): boolean {
  return !!password.match(/[0-9]/g);
}

export function validatePasswordSymbols(password: string): boolean {
  return !!password.match(/[\!|\@|\#|\$|\%|\^|\&|\*|\.|\,]/g);
}
