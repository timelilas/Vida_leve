import { ActivityFrequency } from "../@shared";
import { Gender } from "../@shared";
import { PlanType } from "../@shared";
import { CaloriePlanEntity } from "../caloriePlan/entity";
import { ProgressEntity } from "./entity";

interface CaloriePlanParams extends Omit<ProgressEntity, "currentCaloriePlan"> {
  type: PlanType;
  gender: Gender;
  age: number;
}

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

  public static createCaloriePlan(
    params: CaloriePlanParams
  ): CaloriePlanEntity {
    const { age, weight, height, gender, goalWeight, type } = params;

    const BMR = ProgressHelper.calculateBMR(gender, weight, height, age);
    const TDEE = ProgressHelper.calculateTDEE(BMR, params.activityFrequency);

    const calorieOffset: Record<PlanType, number> = {
      gradual: 400,
      moderado: 625,
      acelerado: 875,
    };

    const dailyCalorieIntake = Math.round(
      goalWeight >= weight
        ? TDEE + calorieOffset[type]
        : TDEE - calorieOffset[type]
    );
    const totalKcal = Math.abs(goalWeight - weight) * 7700;
    const durationInDays = Math.ceil(totalKcal / calorieOffset[type]);

    return {
      type,
      durationInDays,
      dailyCalorieIntake,
    };
  }

  private static calculateBMR(
    gender: Gender,
    weight: number,
    height: number,
    age: number
  ): number {
    return gender === "masculino"
      ? 88.36 + 13.4 * weight + 4.8 * 100 * height - 5.7 * age
      : 447.6 + 9.2 * weight + 3.1 * 100 * height - 4.3 * age;
  }

  private static calculateTDEE(
    bmr: number,
    activityFrequency: ActivityFrequency
  ): number {
    const activityMultiplyers = {
      pouca: 1.2,
      leve: 1.375,
      moderada: 1.55,
      intensa: 1.725,
    };
    return bmr * activityMultiplyers[activityFrequency];
  }

  private static getIMCRangeByAge(age: number): { min: number; max: number } {
    return {
      min: age < 60 ? 18.5 : 22,
      max: age < 60 ? 24.9 : 27,
    };
  }
}
