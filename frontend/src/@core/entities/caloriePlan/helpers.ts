import { PlanType } from "../@shared/plantType";
import { GenderType } from "../@shared/gender";
import { ActitivyFrequency } from "../@shared/activityFrequency";
import { CaloriePlanProps } from "./caloriePlan";
import * as CONSTANTS from "./constants";

interface BMRParams {
  gender: GenderType;
  height: number; // altura em metros
  weight: number; // peso em quilogramas
  age: number;
}

interface PlanParams extends BMRParams {
  planType: PlanType;
  goalWeight: number; // meta de peso em quilogramas
  dailyActivityLevel: ActitivyFrequency;
}

//Calcula a taxa metabólica basal (BMR) do usuário
function calculateBMR(params: BMRParams) {
  const { weight, height, gender, age } = params;
  const BMRConstantsMap = {
    masculino: {
      baselineValue: CONSTANTS.MALE_BMR_BASELINE,
      weightMultiplier: CONSTANTS.MALE_WEIGHT_MULTIPLIER,
      heightMultiplier: CONSTANTS.MALE_HEIGHT_MULTIPLIER,
      ageMultiplier: CONSTANTS.MALE_AGE_MULTIPLIER,
    },
    feminino: {
      baselineValue: CONSTANTS.FEMALE_BMR_BASELINE,
      weightMultiplier: CONSTANTS.FEMALE_WEIGHT_MULTIPLIER,
      heightMultiplier: CONSTANTS.FEMALE_HEIGHT_MULTIPLIER,
      ageMultiplier: CONSTANTS.FEMALE_AGE_MULTIPLIER,
    },
  };

  const { baselineValue, weightMultiplier, heightMultiplier, ageMultiplier } =
    BMRConstantsMap[gender];

  const BMRValue =
    baselineValue +
    weight * weightMultiplier +
    height * 100 * heightMultiplier -
    age * ageMultiplier;

  return BMRValue;
}

//Calcula o gasto calórico total diário (TDEE) com base no BMR e no nível de
//atividade física do usuário
function calculateTDEE(BMRValue: number, activityLevel: ActitivyFrequency) {
  const activityLevelMultipliers: Record<ActitivyFrequency, number> = {
    pouca: CONSTANTS.SEDENTARY_ACTIVITY_LEVEL_MULTIPLIER,
    leve: CONSTANTS.LIGHT_ACTIVITY_LEVEL_MULTIPLIER,
    moderada: CONSTANTS.MODERATE_ACTIVITY_LEVEL_MULTIPLIER,
    intensa: CONSTANTS.INTENSE_ACTIVITY_LEVEL_MULTIPLIER,
  };

  const TDEEValue = activityLevelMultipliers[activityLevel] * BMRValue;

  return TDEEValue;
}

export function buildCaloriePlan(params: PlanParams): CaloriePlanProps {
  const { age, weight, height, gender, goalWeight } = params;

  const BMRValue = calculateBMR({ age, weight, height, gender });
  const TDEEValue = calculateTDEE(BMRValue, params.dailyActivityLevel);

  const calorieOffsetMap: Record<PlanType, number> = {
    gradual: CONSTANTS.GRADUAL_DAILY_CALORIE_OFFSET,
    moderado: CONSTANTS.MODERATE_DAILY_CALORIE_OFFSET,
    acelerado: CONSTANTS.ACCELERATED_DAILY_CALORIE_OFFSET,
  };

  const dailyCalorieIntake = Math.round(
    goalWeight >= weight
      ? TDEEValue + calorieOffsetMap[params.planType]
      : TDEEValue - calorieOffsetMap[params.planType]
  );
  const totalKcal = Math.abs(goalWeight - weight) * CONSTANTS.KG_IN_KCAL;
  const durationInDays = Math.ceil(
    totalKcal / calorieOffsetMap[params.planType]
  );

  return {
    type: params.planType,
    dailyCalorieIntake,
    durationInDays,
  };
}
