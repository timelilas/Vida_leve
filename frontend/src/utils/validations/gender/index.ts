import { validGenders } from "../../../@core/entities/@shared/gender/constants";
import { ValidationResult } from "../type";

export function validateGender(gender: string): ValidationResult {
  if (!gender.length) {
    return {
      success: false,
      error: "Ops! Você precisa escolher uma das opções acima para continuar.",
    };
  }

  if (!validGenders.includes(gender as any)) {
    return {
      success: false,
      error: "Apenas os gêneros masculino e feminino são permitidos.",
    };
  }

  return { success: true };
}
