import { userSchema } from "../../schemas/user";
import { createSwaggerErrorExample } from "../../utils/helpers";

export const updateUser = {
  tags: ["User"],
  operationId: "updateUser",
  summary: "Atualização do perfil do usuário.",
  description:
    "Endpoint responsável atualizar as informações do perfil do usuário.",
  security: [{ BearerAuth: [] }],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["name", "gender", "birthDate", "phone"],
          properties: {
            name: userSchema.properties.name,
            phone: userSchema.properties.phone,
            birthDate: userSchema.properties.birthDate,
            gender: userSchema.properties.gender,
          },
        },
        examples: {
          user: {
            value: {
              name: "Teste Usuário",
              phone: "557899999999",
              gender: "masculino",
              birthDate: "2004-12-04T00:00:00.000Z",
            },
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Informações do usuário atualizadas com sucesso.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["data"],
            properties: { data: { $ref: "#/components/schemas/User" } },
          },
          examples: {
            user: {
              value: {
                data: {
                  id: 2,
                  name: "Teste Usuário",
                  email: "seu-email@email.com",
                  phone: "557899999999",
                  gender: "masculino",
                  imageUrl: null,
                  birthDate: "2004-12-04T00:00:00.000Z",
                  registrationDate: "2025-08-09T22:55:40.480Z",
                },
              },
            },
          },
        },
      },
    },
    "400": {
      description: "A requisição contém dados inválidos ou ausentes.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorResponse" },
          examples: {
            badRequest: {
              value: createSwaggerErrorExample({
                path: "/users/profile",
                status: 400,
                field: "phone",
                error: "Telefone deve conter apenas caracteres numéricos.",
              }),
            },
          },
        },
      },
    },
    "401": {
      description: "Token inválido",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorResponse" },
          examples: {
            unauthorized: {
              value: createSwaggerErrorExample({
                path: "/users/profile",
                status: 401,
                error: "Usuário não autorizado ou token inválido.",
              }),
            },
          },
        },
      },
    },
    "500": {
      description: "Erro interno.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorResponse" },
          examples: {
            internalError: {
              value: createSwaggerErrorExample({
                path: "/users/profile",
                status: 500,
                error: "Erro ao atualizar os dados do usuário.",
              }),
            },
          },
        },
      },
    },
  },
};
