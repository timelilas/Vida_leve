import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";
import { weightOutOfRangeMsg } from "./variables";

export function validateWeight(weight: number): ValidationResult {
  if (isNaN(weight)) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  if (weight < 30 || weight > 150) {
    return { success: false, error: weightOutOfRangeMsg };
  }

  return { success: true };
}
