import { Router } from "express";
import PlanHistoryController from "../controller/PlanHistory/PlanHistoryController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";

const planHistoryRouter = Router();
const planHistoryController = new PlanHistoryController();

planHistoryRouter.get("/", 
    (req, res, next) => authorizationMiddleware.execute(req, res, next),
    (req, res) => planHistoryController.get(req, res)
);

planHistoryRouter.get("/:date", 
    (req, res, next) => authorizationMiddleware.execute(req, res, next),
    (req, res) => planHistoryController.getByDate(req, res)
);

planHistoryRouter.post("/", 
    (req, res, next) => authorizationMiddleware.execute(req, res, next),
    (req, res) => planHistoryController.post(req, res)
);

planHistoryRouter.put("/", 
    (req, res, next) => authorizationMiddleware.execute(req, res, next),
    (req, res) => planHistoryController.put(req, res)
);

export default planHistoryRouter;