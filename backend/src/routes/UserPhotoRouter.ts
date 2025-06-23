import { Router } from "express";
import UserPhotoController from "../controller/UserPhotoController/UserPhotoController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import multer from "multer";

const UserPhotoRouter = Router();
const userPhotoController = new UserPhotoController();

const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * @swagger
 * /users/{id}/photo:
 *   post:
 *     summary: Envia uma foto do usuário
 *     tags:
 *       - Fotos do Usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Foto enviada com sucesso
 *       400:
 *         description: Nenhum arquivo enviado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

UserPhotoRouter.post(
  "/:id/photo",
  upload.single("photo"),
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  (req, res) => userPhotoController.uploadPhoto(req, res)
);

/**
 * @swagger
 * /users/{id}/photo:
 *   get:
 *     summary: Obtém a foto do usuário
 *     tags:
 *       - Fotos do Usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Foto obtida com sucesso
 *       401:
 *         description: Não autorizado
 */

UserPhotoRouter.get(
  "/:id/photo",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  (req, res) => userPhotoController.getUserPhoto(req, res)
);

/**
 * @swagger
 * /users/{id}/photo:
 *   delete:
 *     summary: Deleta a foto do usuário
 *     tags:
 *       - Fotos do Usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Foto deletada com sucesso
 *       401:
 *         description: Não autorizado
 */

UserPhotoRouter.delete(
  "/:id/photo",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  (req, res) => userPhotoController.deleteUserPhoto(req, res)
);

export default UserPhotoRouter;