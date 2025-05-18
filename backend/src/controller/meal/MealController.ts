import { Request, Response } from "express";
import MealService from "../../service/meal/MealService";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import { ConflictException } from "../../@core/exception/http/ConflictException";
import { NotFoundException } from "../../@core/exception/http/NotFoundException";
import { DEFAULT_MEAL_SEARCH_LIMIT } from "./constants";
import UserService from "../../service/user/UserService";
import { BadRequestException } from "../../@core/exception/http/BadRequestException";

export default class MealController {
  private _mealService = new MealService();
  private _userService = new UserService();

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
          `Já existe uma refeição do tipo '${mealType}' na data: '${date}' cadastrada para este usuário.`,
          MealController.name
        );
      }

      const user = await this._userService.get(userId);

      if (user?.registrationDate) {
        const mealDate = new Date(date);
        mealDate.setUTCHours(3);

        const registrationDateOnly = new Date(
          user.registrationDate.getFullYear(),
          user.registrationDate.getMonth(),
          user.registrationDate.getDate()
        );

        if (mealDate.getTime() < registrationDateOnly.getTime()) {
          throw new BadRequestException(
            `A data da refeição deve ser maior ou igual a data de registro do usuário.`,
            MealController.name,
            "date"
          );
        }
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
        alternativeMsg: "Erro durante a criação da refeição.",
      });
    }
  }

  async updateMeal(req: Request, res: Response): Promise<Response> {
    const { foods } = req.body;
    const mealId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
      const foundMeal = await this._mealService.getById({ id: mealId, userId });

      if (!foundMeal) {
        throw new NotFoundException(
          `Refeição com id: '${mealId}' não foi encontrada.`,
          MealController.name
        );
      }

      const updatedMeal = await this._mealService.upsert({
        id: mealId,
        userId: req.user.id,
        mealType: foundMeal.type,
        date: foundMeal.date,
        foods,
      });

      return res.status(200).json({ data: updatedMeal });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: "Erro durante a atualização da refeição.",
      });
    }
  }

  async getMeals(req: Request, res: Response): Promise<Response> {
    const query = req.query as {
      date?: string;
      limit?: number;
      offset?: number;
    };
    const userId = req.user.id;

    try {
      const { meals, hasMore } = await this._mealService.getMeals({
        userId: userId,
        date: query.date ? new Date(query.date) : undefined,
        limit: query.limit || DEFAULT_MEAL_SEARCH_LIMIT,
        offset: query.offset,
      });

      return res.status(200).json({ data: { meals, hasMore } });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: `Erro ao obter as refeições do usuário com id: '${userId}'.`,
      });
    }
  }

  async getCalorieStatistics(req: Request, res: Response) {
    const userId = req.user.id;
    const query = req.query as { from?: string; to?: string };

    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth();
    const currentYear = currentDate.getUTCFullYear();

    const from = query.from
      ? new Date(query.from)
      : new Date(currentYear, currentMonth, 1);

    const to = query.to
      ? new Date(query.to)
      : new Date(currentYear, currentMonth + 1, 0);

    try {
      const calorieStatistics = await this._mealService.getCalorieStatistics({
        userId,
        from,
        to,
      });

      return res.status(200).json({ data: calorieStatistics });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: `Erro na obtenção das estatisticas do consumo de calorias do usuário com id: '${userId}'.`,
      });
    }
  }
}
