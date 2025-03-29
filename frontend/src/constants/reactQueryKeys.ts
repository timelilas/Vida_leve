export const QueryKeys = {
  DATABASE: {
    USER: ["db-user"],
    PROGRESS: ["db-progress"],
    MEALS: (date: string) => [`"db-meals-date-${date}"`],
    CALORIE_PLANS: ["db-calorie-plans"],
    FOODS: (foodName: string) => [`db-foods-${foodName}`] as const,
    CALORIE_STATISTICS: (from: string, to: string) =>
      ["db-calorie-statistics", from, to] as const,
  },
};
