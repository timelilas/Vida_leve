import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";
import { emailRegexp, invalidEmailMsg } from "./variables";

export function validateEmail(email: string): ValidationResult {
  if (email.length <= 0) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  if (!email.match(emailRegexp)) {
    return { success: false, error: invalidEmailMsg };
  }

  return { success: true };
}
