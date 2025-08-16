export const foodSchema = {
  type: "object",
  required: ["id", "name", "measurementUnit", "calories"],
  properties: {
    id: { type: "string" },
    name: { type: "string", nullable: true },
    measurementUnit: { type: "string" },
    calories: { type: "integer", minimum: 0 },
  },
};
