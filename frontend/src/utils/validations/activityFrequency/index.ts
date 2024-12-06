import { ValidationResult } from "../type";
import {
  allowedActivityFrequencies,
  invalidActivityFrequencyMsg,
} from "./variables";

export function validateActitivyFrequency(value: string): ValidationResult {
  if (!value.length) {
    return {
      success: false,
      error: "Ops! Você precisa escolher uma das opções acima para continuar.",
    };
  }

  if (!allowedActivityFrequencies.includes(value)) {
    return { success: false, error: invalidActivityFrequencyMsg };
  }

  return { success: true };
}
