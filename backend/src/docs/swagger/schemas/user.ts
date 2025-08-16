export const userSchema = {
  type: "object",
  required: [
    "id",
    "name",
    "email",
    "phone",
    "gender",
    "birthDate",
    "imageUrl",
    "registrationDate",
  ],
  properties: {
    id: { type: "integer", minimum: 1 },
    name: { type: "string", nullable: true },
    email: { type: "string", format: "email" },
    phone: { type: "string", nullable: true },
    gender: { type: "string", nullable: true, enum: ["masculino", "feminino"] },
    birthDate: { type: "string", nullable: true, format: "date-time" },
    imageUrl: { type: "string", nullable: true },
    registrationDate: { type: "string", format: "date-time" },
  },
};
