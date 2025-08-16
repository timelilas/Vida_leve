export const progressSchema = {
  type: "object",
  required: [
    "height",
    "weight",
    "goalWeight",
    "activityFrequency",
    "currentCaloriePlan",
    "lastWeightUpdateAt",
  ],
  properties: {
    height: { type: "number", minimum: 0.4, maximum: 3.0 },
    weight: { type: "integer", minimum: 30, maximum: 150 },
    goalWeight: { type: "integer", minimum: 30, maximum: 150 },
    activityFrequency: {
      type: "string",
      enum: ["pouca", "leve", "moderada", "intensa"],
    },
    currentCaloriePlan: {
      type: "string",
      nullable: true,
      enum: ["gradual", "moderado", "acelerado"],
    },
    lastWeightUpdateAt: { type: "string", format: "date-time" },
  },
};
