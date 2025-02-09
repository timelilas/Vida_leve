import { Request, Response, Router } from "express";
import { FoodController } from "../controller/food/FoodController";
import { queryValidationMiddleware } from "../middleware/validation/queryValidationMiddleware";
import { getFoodsQuerySchema } from "../controller/food/schemas";

const foodRouter = Router();
const foodController = new FoodController();

foodRouter.get(
  "/",
  queryValidationMiddleware(getFoodsQuerySchema),
  (req: Request, res: Response) => foodController.getFoods(req, res)
);

export default foodRouter;
