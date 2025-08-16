export const caloriePlanSchema = {
  type: "object",
  required: ["type", "durationInDays", "dailyCalorieIntake"],
  properties: {
    type: { type: "string", enum: ["gradual", "moderado", "acelerado"] },
    durationInDays: { type: "integer", minimum: 1 },
    dailyCalorieIntake: { type: "integer", minimum: 1 },
  },
};
