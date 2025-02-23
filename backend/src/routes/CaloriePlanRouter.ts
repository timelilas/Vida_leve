import { Router } from "express";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { CaloriePlanController } from "../controller/caloriePlan/CaloriePlanController";

const caloriePlanRouter = Router();
const caloriePlanController = new CaloriePlanController();

caloriePlanRouter.get(
  "/",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  (req, res) => caloriePlanController.getPlans(req, res)
);

export default caloriePlanRouter;
