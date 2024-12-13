export type PlanType = "gradual" | "moderado" | "acelerado";

export type ActivityFrequency = "pouca" | "leve" | "moderada" | "intensa";

export type Gender = "masculino" | "feminino";

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
