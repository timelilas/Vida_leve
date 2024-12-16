import { Router } from "express";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { CaloriePlanController } from "../controller/caloriePlan/CaloriePlanController";

const caloriePlanRouter = Router();
const caloriePlanController = new CaloriePlanController();

caloriePlanRouter.get("/", authorizationMiddleware, (req, res) =>
  caloriePlanController.get(req, res)
);

export default caloriePlanRouter;
