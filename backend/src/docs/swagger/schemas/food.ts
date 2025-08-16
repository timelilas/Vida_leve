export const foodSchema = {
  type: "object",
  required: ["id", "name", "measurementUnit", "calories"],
  properties: {
    id: { type: "integer", minimum: 1 },
    name: { type: "string" },
    measurementUnit: { type: "string" },
    calories: { type: "integer", minimum: 0 },
  },
};
