import { ValidationResult } from "../type";
import { allowedGenders } from "./variables";

export function validateGender(gender: string): ValidationResult {
  if (!gender.length) {
    return {
      success: false,
      error: "Ops! Você precisa escolher uma das opções acima para continuar.",
    };
  }

  if (!allowedGenders.includes(gender)) {
    return {
      success: false,
      error: "Apenas os gêneros masculino e feminino são permitidos.",
    };
  }

  return { success: true };
}
