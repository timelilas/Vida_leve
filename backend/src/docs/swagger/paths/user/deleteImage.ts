import { createSwaggerErrorExample } from "../../utils/helpers";

export const deleteImage = {
  tags: ["User"],
  operationId: "deleteUserImage",
  summary: "Remoção da imagem de perfil.",
  description:
    "Endpoint responsável por remover a imagem de perfil do usuário.",
  security: [{ BearerAuth: [] }],
  responses: {
    "204": {
      description: "Imagem de perfil removida com sucesso.",
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
    "404": {
      description: "Imagem de perfil não encontrada.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorResponse" },
          examples: {
            imageNotFound: {
              value: createSwaggerErrorExample({
                path: "/users/profile/image",
                status: 404,
                error: "Imagem de perfil do usuário '55' não encontrada",
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
                error: "Erro ao tentar remover a imagem de perfil.",
              }),
            },
          },
        },
      },
    },
  },
};
