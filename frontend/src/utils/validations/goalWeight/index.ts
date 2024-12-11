import { calculateWeightRangeByIMC } from "../../../@core/entities/progress/helpers";
import { GenderType } from "../../../@core/entities/@shared/gender";
import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";

interface HealthMetrics {
  age: number;
  gender: GenderType;
  height: number;
  goalWeight: number;
}

export function validateGoalWeight(metrics: HealthMetrics): ValidationResult {
  const { age, height, goalWeight } = metrics;
  const genderLabel =
    metrics.gender === "masculino" ? "um homem" : "uma mulher";

  if (isNaN(goalWeight)) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  const healthyWeightRange = calculateWeightRangeByIMC(age, height);
  if (
    goalWeight < healthyWeightRange.min ||
    goalWeight > healthyWeightRange.max
  ) {
    const heightAsString = `${height}`.replace(".", ",");
    const { min, max } = healthyWeightRange;

    return {
      success: false,
      error: `Quase lá! O peso saudável para ${genderLabel} de ${age} anos com ${heightAsString} m está entre ${min} kg e ${max} kg.`,
    };
  }

  return { success: true };
}
