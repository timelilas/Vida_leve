export type activityFrequency = "pouca" | "leve" | "moderada" | "intensa";
export type Gender = "masculino" | "feminino" | null;

export interface ProgressEntity {
  height: number;
  weight: number;
  goalWeight: number;
  activityFrequency: activityFrequency;
}

export interface UserData {
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityFrequency: activityFrequency;
}

export interface WeightLossPlan {
  slow: number;
  moderate: number;
  fast: number;
}

