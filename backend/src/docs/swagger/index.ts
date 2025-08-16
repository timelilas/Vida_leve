import { authPaths } from "./paths/auth";
import { foodPaths } from "./paths/food";
import { progressPaths } from "./paths/progress";
import { userPaths } from "./paths/user";
import { swaggerSchemas } from "./schemas";

export const swaggerSpec = {
  openapi: "3.0.0",
  license: {
    name: "Attribution-NonCommercial-NoDerivatives 4.0 International",
    url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  },
  info: {
    title: "API - Vida Leve",
    description: "API utilizada no aplicativo Vida Leve",
    version: "1.0.0",
  },
  tags: [
    {
      name: "Auth",
      description: "Operações de autenticação de autorização",
    },
    {
      name: "User",
      description: "Operações de perfil do usuário",
    },
    {
      name: "Progress",
      description: "Operações relacionadas ao progresso do usuário",
    },
    {
      name: "Food",
      description: "Operações de consulta de alimentos",
    },
  ],
  paths: {
    ...authPaths,
    ...userPaths,
    ...progressPaths,
    ...foodPaths,
    // "/surveys/{id}/results": surveyResultPaths,
  },
  components: {
    schemas: swaggerSchemas,
    // responses: swaggerResponses,
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Digite um token JWT válido.",
      },
    },
  },
};
