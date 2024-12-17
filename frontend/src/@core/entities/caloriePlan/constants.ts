//Constantes utilizadas no cálculo da taxa metabólica basal
//seguindo a fórmula de Harris-Benedict
export const MALE_BMR_BASELINE = 88.36;
export const MALE_WEIGHT_MULTIPLIER = 13.4;
export const MALE_HEIGHT_MULTIPLIER = 4.8;
export const MALE_AGE_MULTIPLIER = 5.7;

export const FEMALE_BMR_BASELINE = 447.6;
export const FEMALE_WEIGHT_MULTIPLIER = 9.2;
export const FEMALE_HEIGHT_MULTIPLIER = 3.1;
export const FEMALE_AGE_MULTIPLIER = 4.3;

//Multiplicadores de nível de atividade física diária
export const SEDENTARY_ACTIVITY_LEVEL_MULTIPLIER = 1.2;
export const LIGHT_ACTIVITY_LEVEL_MULTIPLIER = 1.375;
export const MODERATE_ACTIVITY_LEVEL_MULTIPLIER = 1.55;
export const INTENSE_ACTIVITY_LEVEL_MULTIPLIER = 1.725;

//Deficits ou superavits calóricos diários
export const GRADUAL_DAILY_CALORIE_OFFSET = 400;
export const MODERATE_DAILY_CALORIE_OFFSET = 625;
export const ACCELERATED_DAILY_CALORIE_OFFSET = 875;

//Total de calorias para perder 1kg de gordura
export const KG_IN_KCAL = 7700;
