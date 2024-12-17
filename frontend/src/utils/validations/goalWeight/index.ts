import { calculateWeightRangeByIMC } from "../../../@core/entities/progress/helpers";
import { GenderType } from "../../../@core/entities/@shared/gender/type";
import { ValidationResult } from "../type";
import { defaultMissingFieldMsg } from "../variables";

interface HealthMetrics {
  age: number;
  gender: GenderType;
  height: number;
  weight: number;
  goalWeight: number;
}

export function validateGoalWeight(metrics: HealthMetrics): ValidationResult {
  const { age, height, weight, goalWeight } = metrics;
  const genderLabel =
    metrics.gender === "masculino" ? "um homem" : "uma mulher";

  if (isNaN(goalWeight)) {
    return { success: false, error: defaultMissingFieldMsg };
  }

  if (goalWeight === weight) {
    return {
      success: false,
      error: "O peso desejado deve ser diferente do peso atual.",
    };
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
