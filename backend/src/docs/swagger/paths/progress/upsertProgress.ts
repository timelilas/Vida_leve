import { progressSchema } from "../../schemas/progress";
import { createSwaggerErrorExample } from "../../utils/helpers";

export const upsertProgress = {
  tags: ["Progress"],
  operationId: "upsertProgressData",
  summary: "Cadastra ou atualiza as informações de progresso.",
  description:
    "<p>Endpoint responsável por cadastra ou atualizar as informações de progresso do usuário. <b>A atualização do campo 'weight' por um valor diferente do anterior DELETA o histórico de pesos do usuário.</b></p>",
  security: [{ BearerAuth: [] }],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["height", "weight", "goalWeight", "activity"],
          properties: {
            height: progressSchema.properties.height,
            weight: progressSchema.properties.weight,
            goalWeight: progressSchema.properties.goalWeight,
            activityFrequency: progressSchema.properties.activityFrequency,
            currentCaloriePlan: {
              ...progressSchema.properties.currentCaloriePlan,
              nullable: false,
            },
          },
          examples: {
            withoutCaloriePlan: {
              value: {
                height: 1.72,
                weight: 73,
                goalWeight: 68,
                activityFrequency: "leve",
              },
            },
            withCaloriePlan: {
              value: {
                height: 1.72,
                weight: 73,
                goalWeight: 68,
                activityFrequency: "leve",
                currentCaloriePlan: "moderado",
              },
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Informações de progresso atualizada com sucesso.",
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
                    currentCaloriePlan: "moderado",
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
              invalidActivityFrequency: {
                value: createSwaggerErrorExample({
                  path: "/progress",
                  status: 400,
                  field: "activityFrequency",
                  error:
                    "Frequência de atividade física permite apenas os seguintes valores: pouca, leve, moderada e intensa",
                }),
              },
              missingBirthDate: {
                value: createSwaggerErrorExample({
                  path: "/progress",
                  status: 400,
                  error:
                    "É necessário ter uma data de nascimento cadastrada para continuar.",
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
  },
};
