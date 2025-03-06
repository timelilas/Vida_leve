export const QueryKeys = {
  DATABASE: {
    USER: ["db-user"],
    PROGRESS: ["db-progress"],
    FOODS: (foodName: string) => [`db-foods-${foodName}`] as const,
  },
};
