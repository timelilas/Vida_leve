import { createSwaggerErrorExample } from "../../utils/helpers";

export const getProgress = {
  tags: ["Progress"],
  operationId: "getProgressData",
  summary: "Obtenção dos dados de progresso do usuário.",
  description:
    "Endpoint responsável por obter as informações de progresso do usuário.",
  security: [{ BearerAuth: [] }],
  responses: {
    "200": {
      description: "Informações de progresso obtidas com sucesso.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["data"],
            properties: {
              data: { $ref: "#/components/schemas/Progress" },
            },
          },
          examples: {
            progressData: {
              value: {
                data: {
                  height: 1.75,
                  weight: 78,
                  goalWeight: 65,
                  activityFrequency: "moderada",
                  currentCaloriePlan: "moderado",
                  lastWeightUpdateAt: "2025-06-10T23:33:48.662Z",
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
                path: "/progress",
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
                path: "/progress",
                status: 500,
                error: "Erro na busca das informações de progresso.",
              }),
            },
          },
        },
      },
    },
  },
};
