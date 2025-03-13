import { Request, Response } from "express";
import MealService from "../../service/meal/MealService";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import { ConflictException } from "../../@core/exception/http/ConflictException";
import { NotFoundException } from "../../@core/exception/http/NotFoundException";

export default class MealController {
  private _mealService = new MealService();

  async createMeal(req: Request, res: Response): Promise<Response> {
    const { date, mealType, foods } = req.body;
    const userId = req.user.id;

    try {
      const foundMeal = await this._mealService.searchMeal({
        date: new Date(date),
        mealType,
        userId,
      });

      if (foundMeal) {
        throw new ConflictException(
          `Já existe uma refeição do tipo '${mealType}' na data: '${date}' cadastrada para este usuário`,
          MealController.name
        );
      }
      const cratedMeal = await this._mealService.upsert({
        userId: req.user.id,
        date: new Date(date),
        mealType,
        foods,
      });

      return res.status(200).json({ data: cratedMeal });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro durante a criação da refeição",
      });
    }
  }

  async updateMeal(req: Request, res: Response): Promise<Response> {
    const { id, foods } = req.body;
    const userId = req.user.id;

    try {
      const foundMeal = await this._mealService.getById({ id, userId });

      if (!foundMeal) {
        throw new NotFoundException(
          `Refeição com id: '${id}' não foi encontrada`,
          MealController.name
        );
      }

      // const updatedMeal = await this._mealService.upsert({
      //   userId: req.user.id,
      //   date: foundMeal.date,
      //   mealType: foundMeal.type,
      //   foods,
      // });

      return res.status(200).json({ data: foundMeal });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro durante a atualização da refeição",
      });
    }
  }

  async getMeals(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const mealDate = req.query.date as string;
    try {
      const meals = await this._mealService.getMeals({
        userId: userId,
        date: new Date(mealDate),
      });

      return res.status(200).json({ data: meals });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: `Erro ao obter as refeições do usuário com id: ${userId}`,
      });
    }
  }

  async getCalorieConsumption(req: Request, res: Response) {
    const date = req.params.date;
    const userId = req.user.id;

    try {
      const dailyCalorieConsumption =
        await this._mealService.getCalorieConsumption({
          date: new Date(date),
          userId,
        });
      return res.status(200).json({ data: dailyCalorieConsumption });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro ao obter o consumo de calorias diário",
      });
    }
  }
}
