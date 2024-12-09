import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";
import { heightOutOfRangeMsg } from "./variables";

export function validateHeight(height: number): ValidationResult {
  if (isNaN(height)) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  if (height < 0.4 || height > 3.0) {
    return { success: false, error: heightOutOfRangeMsg };
  }

  return { success: true };
}
