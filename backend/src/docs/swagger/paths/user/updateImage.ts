import { createSwaggerErrorExample } from "../../utils/helpers";

export const updateImage = {
  tags: ["User"],
  operationId: "updateUserImage",
  summary: "Atualização da imagem de perfil.",
  description: "Endpoint responsável atualizar a imagem de perfil do usuário.",
  security: [{ BearerAuth: [] }],
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          required: ["file"],
          properties: {
            file: { type: "string", format: "binary" },
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Imagem de perfil atualizada com sucesso.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["data"],
            properties: {
              data: {
                type: "object",
                required: ["imageUrl"],
                properties: { imageUrl: { type: "string" } },
              },
            },
          },
          examples: {
            user: {
              value: {
                data: { imageUrl: "https://..." },
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
                path: "/users/profile/image",
                status: 400,
                field: "field",
                error: "Nenhum arquivo enviado.",
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
                path: "/users/profile/image",
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
                path: "/users/profile/image",
                status: 500,
                error: "Erro ao tentar atualizar a imagem de perfil.",
              }),
            },
          },
        },
      },
    },
  },
};
