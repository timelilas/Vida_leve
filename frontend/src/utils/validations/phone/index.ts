import { ValidationResult } from "../type";
import { invalidPhoneFormatMsg } from "./variables";

export function validatePhone(phone: string): ValidationResult {
  const onlyNumbers = phone.replace(/\D/g, "");

  if (onlyNumbers.length !== 11) {
    return { success: false, error: invalidPhoneFormatMsg };
  }

  return { success: true };
}
