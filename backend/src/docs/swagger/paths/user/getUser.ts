import { createSwaggerErrorExample } from "../../utils/helpers";

export const getUser = {
  tags: ["User"],
  operationId: "getUser",
  summary: "Obtenção do perfil do usuário.",
  description:
    "Endpoint responsável por obter as informações do perfil do usuário.",
  security: [{ BearerAuth: [] }],
  responses: {
    "200": {
      description: "Informações de perfil obtidas com sucesso.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["data"],
            properties: {
              data: { $ref: "#/components/schemas/User" },
            },
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
                error: "Erro ao obter o perfil do usuário.",
              }),
            },
          },
        },
      },
    },
  },
};
