export const QueryKeys = {
  DATABASE: {
    USER: ["db-user"],
    PROGRESS: ["db-progress"],
    CALORIE_PLANS: ["db-calorie-plans"],
    FOODS: (foodName: string) => [`db-foods-${foodName}`] as const,
    CALORIE_CONSUMPTION: (date: string) => [`db-calorie-consumption-${date}`],
  },
};
