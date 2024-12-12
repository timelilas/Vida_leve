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
      min: age < 60 ? 18.5 : 22,
      max: age < 60 ? 24.9 : 27,
    };
  }

  public static calculateBMR(gender: Gender, weight: number, height: number, age: number): number {
    return gender === "masculino"
      ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
      : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
  }

  public static calculateTDEE(bmr: number, activityFrequency: activityFrequency): number {
    const activityMultiplyers = {
      pouca: 1.2,
      leve: 1.375,
      moderada: 1.55,
      intensa: 1.725,
    };
    return bmr * activityMultiplyers[activityFrequency];
  }

  public static calculateWeightLossPlan(tdee: number): WeightLossPlan {
    return {
      slow: Math.round(tdee - 400),
      moderate: Math.round(tdee - 625),
      fast: Math.round(tdee - 875),
    };
  }
}
