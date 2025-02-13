export const QueryKeys = {
  DATABASE: {
    FOODS: (foodName: string) => [`db-foods-${foodName}`] as const,
  },
};
