import { createSwaggerErrorExample } from "../../utils/helpers";

export const getFoods = {
  tags: ["CaloriePlan"],
  operationId: "getCaloriePlans",
  summary: "Obtenção dos planos de execução disponíveis para o usuário.",
  description:
    "Endpoint responsável por obter os planos de execução disponíveis para o usuário.",
  responses: {
    "200": {
      description: "Planos de execução obtidos com sucesso.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["data"],
            properties: {
              data: {
                type: "array",
                items: { $ref: "#/components/schemas/CaloriePlan" },
              },
            },
          },
          examples: {
            caloriePlans: {
              value: {
                data: [
                  {
                    type: "gradual",
                    durationInDays: 135,
                    dailyCalorieIntake: 2462,
                  },
                  {
                    type: "moderado",
                    durationInDays: 87,
                    dailyCalorieIntake: 2237,
                  },
                  {
                    type: "acelerado",
                    durationInDays: 62,
                    dailyCalorieIntake: 1987,
                  },
                ],
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
                path: "/plans",
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
                path: "/plans",
                status: 500,
                error: "Erro na busca dos planos de execução do usuário.",
              }),
            },
          },
        },
      },
    },
  },
};
