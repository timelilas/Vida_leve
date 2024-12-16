import * as CONSTANTS from "./constants";

// calcula o intervalo de peso recomendável com base na idade e altura do usuário
export function calculateWeightRangeByIMC(age: number, height: number) {
  const imcRange = getIMCRange(age);
  const minimumWeight = height ** 2 * imcRange.min;
  const maximumWeight = height ** 2 * imcRange.max;

  return {
    min: Math.round(minimumWeight),
    max: Math.round(maximumWeight),
  };
}

function getIMCRange(age: number) {
  return {
    min: age < 60 ? CONSTANTS.ADULT_MIN_IMC : CONSTANTS.ELDERLY_MIN_IMC,
    max: age < 60 ? CONSTANTS.ADULT_MAX_IMC : CONSTANTS.ELDERLY_MAX_IMC,
  };
}
