import { progressSchema } from "../../schemas/progress";
import { createSwaggerErrorExample } from "../../utils/helpers";

export const setDefaultCaloriePlan = {
  tags: ["Progress"],
  operationId: "setDefualtCaloriePlanType",
  summary: "Define o plano de execução padrão do usuário.",
  description:
    "Endpoint responsável por definir o plano de execução (ou plano de calorias) padrão do usuário.",
  security: [{ BearerAuth: [] }],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["currentCaloriePlan"],
          properties: {
            currentCaloriePlan: {
              ...progressSchema.properties.currentCaloriePlan,
              nullable: false,
            },
          },
        },
        examples: {
          caloriePlan: {
            value: { currentCaloriePlan: "moderado" },
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Plano de execução padrão definido com sucesso.",
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
                  height: 1.72,
                  weight: 73,
                  goalWeight: 68,
                  activityFrequency: "leve",
                  currentCaloriePlan: "acelerado",
                  lastWeightUpdateAt: "2025-05-18T19:11:39.295Z",
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
            invalidPlanType: {
              value: createSwaggerErrorExample({
                path: "/progress/plan",
                status: 400,
                field: "currentCaloriePlan",
                error:
                  "Plano de execução permite apenas os seguintes valores: gradual, moderado e acelerado.",
              }),
            },
            missingProgressData: {
              value: createSwaggerErrorExample({
                path: "/progress/plan",
                status: 400,
                error: "Este usuário ainda não possui um progresso cadastrado.",
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
                path: "/progress/plan",
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
                path: "/progress/plan",
                status: 500,
                error: "Erro ao definir o plano de execução padrão.",
              }),
            },
          },
        },
      },
    },
  },
};
