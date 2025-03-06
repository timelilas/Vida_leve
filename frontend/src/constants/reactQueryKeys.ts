export const QueryKeys = {
  DATABASE: {
    USER: ["db-user"],
    FOODS: (foodName: string) => [`db-foods-${foodName}`] as const,
  },
};
