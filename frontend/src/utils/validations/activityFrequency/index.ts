import { validActivityFrequencies } from "../../../@core/entities/@shared/activityFrequency/constants";
import { ValidationResult } from "../type";

export function validateActitivyFrequency(value: string): ValidationResult {
  if (!value.length) {
    return {
      success: false,
      error: "Ops! Você precisa escolher uma das opções acima para continuar.",
    };
  }

  if (!validActivityFrequencies.includes(value as any)) {
    return {
      success: false,
      error: "Apenas os níveis de atividade acima são permitidos",
    };
  }

  return { success: true };
}
