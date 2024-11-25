import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";
import { invalidPhoneFormatMsg } from "./variables";

export function validatePhone(phone: string): ValidationResult {
  const onlyNumbers = phone.replace(/\D/g, "");

  if (phone.length === 0) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  if (onlyNumbers.length !== 11) {
    return { success: false, error: invalidPhoneFormatMsg };
  }

  return { success: true };
}
