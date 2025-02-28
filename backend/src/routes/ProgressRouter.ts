import { Router } from "express";
import ProgressController from "../controller/progress/ProgressController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import {
  upsertProgressSchema,
  setCurrentCaloriePlanSchema,
} from "../controller/progress/schemas";

const progressRouter = Router();
const progressController = new ProgressController();

progressRouter.get(
  "/",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  (req, res) => progressController.getProgress(req, res)
);

progressRouter.post(
  "/",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(upsertProgressSchema, "body"),
  (req, res) => progressController.upsert(req, res)
);

progressRouter.patch(
  "/plan",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(setCurrentCaloriePlanSchema, "body"),
  (req, res) => progressController.setCaloriePlan(req, res)
);

export default progressRouter;
