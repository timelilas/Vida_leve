import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";
import { allowedGenders } from "./variables";

export function validateGender(gender: string): ValidationResult {
  if (!gender.length) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  if (!allowedGenders.includes(gender)) {
    return {
      success: false,
      error: "Apenas os gêneros masculino e feminino são permitidos.",
    };
  }

  return { success: true };
}
