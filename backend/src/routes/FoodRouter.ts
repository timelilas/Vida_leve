import { Router } from "express";
import { FoodController } from "../controller/food/FoodController";
import { getFoodsQuerySchema } from "../controller/food/schemas";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";

const foodRouter = Router();
const foodController = new FoodController();

foodRouter.get(
  "/",
  validationMiddleware(getFoodsQuerySchema, "query"),
  (req, res) => foodController.getFoods(req, res)
);

export default foodRouter;
