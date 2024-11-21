import { ValidationResult } from "../type";

export function validateName(name: string): ValidationResult {
  if (!name.length) {
    return {
      success: false,
      error: "Por favor, preencha o seu nome para continuar.",
    };
  }

  return { success: true };
}
