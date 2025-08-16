import { createSwaggerErrorExample } from "../../utils/helpers";

export const login = {
  tags: ["Auth"],
  operationId: "login",
  summary: "Login do usuário.",
  description:
    "Endpoint responsável por realizar o login do usuário no sistema.",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          require: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", format: "password" },
          },
        },
        examples: {
          user: {
            value: {
              email: "seu-email@email.com",
              password: "123456789Abc.",
            },
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Usuário cadastrado com successo.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["data"],
            properties: {
              data: {
                type: "object",
                require: ["id", "token"],
                properties: {
                  id: { type: "string" },
                  token: { type: "string" },
                },
              },
            },
          },
          examples: {
            accessToken: {
              value: {
                data: {
                  id: 1,
                  token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
                },
              },
            },
          },
        },
      },
    },
    "401": {
      description: "Credenciais inválidas.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorResponse" },
          examples: {
            unauthorized: {
              value: createSwaggerErrorExample({
                path: "/auth/login",
                status: 401,
                field: "password",
                error: "Email ou senha incorretos.",
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
                path: "/auth/login",
                status: 500,
                error: "Erro durante o processo de login.",
              }),
            },
          },
        },
      },
    },
  },
};
