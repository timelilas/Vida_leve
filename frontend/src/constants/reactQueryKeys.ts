export const QueryKeys = {
  DATABASE: {
    USER: ["db-user"],
    PROGRESS: ["db-progress"],
    CALORIE_PLANS: ["db-calorie-plans"],
    WEIGHT_HISTORY: ["db-weight-history"],
    MEALS: (date: string) => [`"db-meals-date-${date}"`],
    FOODS: (foodName: string) => [`db-foods-${foodName}`] as const,
    CALORIE_STATISTICS: (from: string, to: string) =>
      ["db-calorie-statistics", from, to] as const
  }
};
