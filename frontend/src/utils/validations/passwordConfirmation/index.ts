import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";

export function validatePasswordConfirmation(
  password: string,
  confirmation: string
): ValidationResult {
  if (confirmation.length <= 0) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  if (password !== confirmation) {
    return {
      success: false,
      error: "Ops! As senhas estão diferentes. Confira e tente novamente!",
    };
  }

  return { success: true };
}
