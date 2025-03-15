import { Router } from "express";
import MealController from "../controller/meal/MealController";
import { authorizationMiddleware } from "../middleware/authorization/authorizationMiddleware";
import { validationMiddleware } from "../middleware/validation/validationMiddleware";
import {
  createMealSchema,
  getCalorieConsumptionSchema,
  getMealsSchema,
  updateMealIdSchema,
  updateMealSchema,
} from "../controller/meal/schemas";

const mealRouter = Router();
const mealController = new MealController();

mealRouter.get(
  "/",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(getMealsSchema, "query"),
  (req, res) => mealController.getMeals(req, res)
);

mealRouter.post(
  "/",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(createMealSchema, "body"),
  (req, res) => mealController.createMeal(req, res)
);

mealRouter.put(
  "/:id",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(updateMealIdSchema, "params"),
  validationMiddleware(updateMealSchema, "body"),
  (req, res) => mealController.updateMeal(req, res)
);

mealRouter.get(
  "/calorie-consumption/:date",
  (req, res, next) => authorizationMiddleware.execute(req, res, next),
  validationMiddleware(getCalorieConsumptionSchema, "params"),
  (req, res) => mealController.getCalorieConsumption(req, res)
);

export default mealRouter;
