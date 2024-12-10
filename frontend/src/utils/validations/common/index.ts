import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";

export function validateEmptyField(value: string): ValidationResult {
  if (value.length <= 0) {
    return { success: false, error: defaultMissingFieldMsg };
  }
  return { success: true };
}
