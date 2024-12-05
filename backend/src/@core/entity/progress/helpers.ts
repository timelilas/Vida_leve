import {
  ADULT_MIN_IMX,
  ADULT_MAX_IMC,
  ELDERLY_MAX_IMC,
  ELDERLY_MIN_IMC,
} from "./constants";

export class ProgressHelper {
  public static calculateHealthyWeightRange(age: number, height: number) {
    const imcRange = ProgressHelper.getIMCRangeByAge(age);
    const minimumWeight = height ** 2 * imcRange.min;
    const maximumWeight = height ** 2 * imcRange.max;

    return {
      min: Math.round(minimumWeight),
      max: Math.round(maximumWeight),
    };
  }

  private static getIMCRangeByAge(age: number): { min: number; max: number } {
    return {
      min: age < 60 ? ADULT_MIN_IMX : ELDERLY_MIN_IMC,
      max: age < 60 ? ADULT_MAX_IMC : ELDERLY_MAX_IMC,
    };
  }
}
