export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PlainDate = {
  year: number;
  month: number;
  day: number;
  weekDay: number;
};

export type DateIntervalType = "monthly" | "weekly";
