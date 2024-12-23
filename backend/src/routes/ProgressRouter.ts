import { Router } from "express";
import ProgressController from "../controller/progress/ProgressController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import {
  createProgressSchema,
  setCurrentCaloriePlanSchema,
} from "../controller/progress/schemas";

const progressRouter = Router();
const progressController = new ProgressController();

progressRouter.get("/", authorizationMiddleware, (req, res) =>
  progressController.get(req, res)
);

progressRouter.patch(
  "/plan",
  authorizationMiddleware,
  validationMiddleware(setCurrentCaloriePlanSchema),
  (req, res) => progressController.setCaloriePlan(req, res)
);

progressRouter.post(
  "/",
  authorizationMiddleware,
  validationMiddleware(createProgressSchema),
  (req, res) => progressController.post(req, res)
);

// progressRouter.get('/',
//    authorizationMiddleware,
//    (req, res)=> progressController.get(req, res)
// );

export default progressRouter;
