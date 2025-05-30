import { Router } from "express";
import WeightHistoryController from "../controller/weightHistory/WeightHistoryController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import {
  addWeightSchema,
  getWeightHistoryQuerySchema,
} from "../controller/weightHistory/schemas";

const weightHistoryRouter = Router();
const weightHistoryController = new WeightHistoryController();

/**
 * @swagger
 * tags:
 *   name: Histórico de Peso
 *   description: Rotas para gerenciar o histórico de peso do usuário
 */

/**
 * @swagger
 * /Weight-History:
 *   get:
 *     summary: Lista todos os registros de peso do usuário autenticado
 *     tags: [Histórico de Peso]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registros encontrados com sucesso
 */
weightHistoryRouter.get(
  "/",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(getWeightHistoryQuerySchema, "query"),
  (req, res) => weightHistoryController.get(req, res)
);

/**
 * @swagger
 * /Weight-History:
 *   post:
 *     summary: Cria um novo registro de peso
 *     tags: [Histórico de Peso]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weight
 *               - date
 *             properties:
 *               weight:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 */
weightHistoryRouter.post(
  "/",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(addWeightSchema, "body"),
  (req, res) => weightHistoryController.addWeight(req, res)
);

/**
 * @swagger
 * /Weight-History/{id}:
 *   delete:
 *     summary: Deleta um registro de peso
 *     tags: [Histórico de Peso]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do registro a ser deletado
 *     responses:
 *       200:
 *         description: Registro deletado com sucesso
 */
weightHistoryRouter.delete(
  "/:id",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  (req, res) => weightHistoryController.delete(req, res)
);

export default weightHistoryRouter;
