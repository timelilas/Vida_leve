import { createSwaggerErrorExample } from "../../utils/helpers";

export const getFoods = {
  tags: ["Food"],
  operationId: "getUser",
  summary: "Obtenção de uma lista de alimentos.",
  description:
    "Endpoint responsável por obter uma lista de alimentos a partir dos parâmetros passados na requisição.",
  parameters: [
    {
      in: "query",
      name: "name",
      description:
        "Nome do alimento usado como filtro para buscar correspondências parciais ou totais.",
      schema: {
        type: "string",
      },
    },
    {
      in: "query",
      name: "limit",
      description:
        "Número máximo de alimentos que serão retornados na resposta da requisição.",
      schema: {
        type: "integer",
        minimum: 1,
        maximum: 20,
      },
    },
    {
      in: "query",
      name: "offset",
      description:
        "Número que define a partir de qual posição os alimentos serão exibidos, ignorando os itens anteriores.",
      schema: {
        type: "integer",
        minimum: 0,
      },
    },
  ],
  responses: {
    "200": {
      description: "Lista de alimentos obtida com sucesso.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["data"],
            properties: {
              data: {
                type: "object",
                required: ["foods", "hasMore"],
                properties: {
                  foods: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Food" },
                  },
                  hasMore: { type: "boolean" },
                },
              },
            },
          },
          examples: {
            empty: {
              value: {
                data: {
                  hasMore: false,
                  foods: [],
                },
              },
            },
            foods: {
              value: {
                data: {
                  hasMore: true,
                  foods: [
                    {
                      id: 1364,
                      name: "Abacate",
                      measurementUnit: "1 col. sopa amassado - (45 g)",
                      calories: 80,
                    },
                    {
                      id: 1365,
                      name: "Abacaxi",
                      measurementUnit: "1 fatia média - (75 g)",
                      calories: 44,
                    },
                  ],
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
                path: "/foods",
                status: 400,
                field: "limit",
                error: "Limit deve ser maior do que 0",
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
                path: "/foods",
                status: 500,
                error: "Erro na obtenção da lista de alimentos.",
              }),
            },
          },
        },
      },
    },
  },
};
