export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export const allowedGenders = ["masculino", "feminino"] as const;
export type Gender = (typeof allowedGenders)[number];

export const allowedPlans = ["gradual", "moderado", "acelerado"] as const;
export type PlanType = (typeof allowedPlans)[number];

export const allowedActivityFrequencies = [
  "pouca",
  "leve",
  "moderada",
  "intensa",
] as const;
export type ActivityFrequency = (typeof allowedActivityFrequencies)[number];

export const allowedTypeMeals = [
  "Café da manhã",
  "Lanche",
  "Almoço",
  "Jantar",
  "Outros",
]
export type TypeMeal = (typeof allowedTypeMeals)[number];