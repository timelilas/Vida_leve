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
    min: age < 60 ? 18.5 : 22,
    max: age < 60 ? 24.9 : 27,
  };
}
