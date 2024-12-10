import {
  ADULT_MIN_IMX,
  ADULT_MAX_IMC,
  ELDERLY_MAX_IMC,
  ELDERLY_MIN_IMC,
  ACTIVITY_MULTIPLIERS,
} from "./constants";
import { activityFrequency, Gender, WeightLossPlan } from "./ProgressEntity";

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

  public static calculateBMR(gender: Gender, weight: number, height: number, age: number): number {
    return gender === "masculino"
      ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
      : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
  }

  public static calculateTDEE(bmr: number, activityFrequency: activityFrequency): number {
    return bmr * ACTIVITY_MULTIPLIERS[activityFrequency];
  }

  public static calculateWeightLossPlan(tdee: number): WeightLossPlan {
    return {
      slow: Math.round(tdee - 400),
      moderate: Math.round(tdee - 625),
      fast: Math.round(tdee - 875),
    };
  }
}
