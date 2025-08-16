export const errorResponseSchema = {
  type: "object",
  required: ["timestamp", "path", "status", "error"],
  properties: {
    timestamp: { type: "string", format: "date-time" },
    path: { type: "string" },
    status: { type: "integer", minimum: 100, maximum: 511 },
    error: { type: "string" },
    field: { type: "string" },
  },
};
