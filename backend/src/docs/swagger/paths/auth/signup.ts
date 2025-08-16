import { createSwaggerErrorExample } from "../../utils/helpers";

export const signup = {
  tags: ["Auth"],
  operationId: "signup",
  summary: "Cadastro de usuário.",
  description: "Endpoint responsável por cadastrar um novo usuário no sistema.",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "password", "passwordConfirmation"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", format: "password" },
            passwordConfirmation: { type: "string", format: "password" },
          },
        },
        examples: {
          user: {
            value: {
              email: "seu-email@email.com",
              password: "123456789Abc.",
              passwordConfirmation: "123456789Abc.",
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
            properties: { data: { $ref: "#/components/schemas/User" } },
          },
          examples: {
            user: {
              value: {
                data: {
                  id: 43,
                  name: null,
                  email: "seu-email@email.com",
                  phone: null,
                  gender: null,
                  imageUrl: null,
                  birthDate: null,
                  registrationDate: "2025-08-09T22:55:40.480Z",
                },
              },
            },
          },
        },
      },
    },
    "409": {
      description: "Já existe um usuário cadastrado com o email fornecido.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorResponse" },
          examples: {
            conflictEmail: {
              value: createSwaggerErrorExample({
                path: "/auth/signup",
                status: 409,
                field: "email",
                error:
                  "Já existe um usuário cadastro com email: 'email@email.com'",
              }),
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
                path: "/auth/signup",
                status: 400,
                field: "password",
                error: "Senha deve conter no mínimo 8 caractere(s).",
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
                path: "/auth/signup",
                status: 500,
                error: "Erro durante o processo de cadastro de usuário.",
              }),
            },
          },
        },
      },
    },
  },
};
