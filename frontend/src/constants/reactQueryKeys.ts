export const QueryKeys = {
  API: {
    USER: ["user"],
    PROGRESS: ["progress"],
    CALORIE_PLANS: ["calorie-plans"],
    WEIGHT_HISTORY: ["weight-history"],
    MEALS: (date: string) => [`meals-on-date-${date}`],
    FOODS: (foodName: string) => [`foods-${foodName}`] as const,
    CALORIE_STATISTICS: (from: string, to: string) => ["calorie-statistics", from, to] as const
  }
};
