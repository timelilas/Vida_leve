import { QueryTypes } from "sequelize";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { sequelize } from "../../database";
import { ConsumedFood, Food, Meal } from "../../database/associations";
import {
  CalorieConsumtionQueryResult,
  CreateMealDTO,
  GetCalorieConsumptionDTO,
  MealQueryResult,
} from "./types";
import { TableNames } from "../../database/constants";
import { MealEntity } from "../../@core/entity/meal/enitys";
import { TypeMeal } from "../../@core/entity/@shared";

export default class MealService {
  public create = async (params: CreateMealDTO) => {
    let transaction = null;

    try {
      transaction = await sequelize.transaction();

      const createdMeal = await Meal.create(
        {
          date: params.date.toISOString().split("T")[0],
          type: params.mealType,
          userId: params.userId,
        },
        { transaction }
      );

      await ConsumedFood.bulkCreate(
        params.foods.map(({ foodId, quantity }) => {
          return { mealId: createdMeal.id, foodId, quantity };
        }),
        { transaction }
      );

      await transaction.commit();

      const queryResult = await sequelize.query<MealQueryResult>(
        this.getMealQueryString(),
        {
          type: QueryTypes.SELECT,
          replacements: [createdMeal.id, params.userId],
        }
      );

      return { ...queryResult[0], date: new Date(queryResult[0].date) };
    } catch (error: any) {
      await transaction?.rollback();
      throw new DatabaseException(
        `Erro durante a criação da refeição do usuário com id: ${params.userId}.`,
        MealService.name,
        error.message
      );
    }
  };

  public getCalorieConsumption = async (params: GetCalorieConsumptionDTO) => {
    const isoDate = params.date.toISOString().split("T")[0];
    const queryString = this.createCalorieConsumptionQueryString();

    try {
      const queryResult = await sequelize.query<CalorieConsumtionQueryResult>(
        queryString,
        {
          type: QueryTypes.SELECT,
          replacements: [params.userId, isoDate],
        }
      );

      const calorieConsumptionMap: Record<TypeMeal | "total", number> = {
        "cafe-da-manha": 0,
        lanche: 0,
        almoco: 0,
        outro: 0,
        jantar: 0,
        total: 0,
      };

      for (const value of queryResult) {
        calorieConsumptionMap[value.type] = value.calories;
      }

      return calorieConsumptionMap;
    } catch (error: any) {
      throw new DatabaseException(
        `Erro ao obter o consumo de calorias do usuário: ${params.userId}, referente a data: ${isoDate}`,
        MealService.name,
        error.message
      );
    }
  };

  private getMealQueryString = () => {
    const meal = TableNames.Meal;
    const consumedFood = TableNames.ConsumedFood;
    const food = TableNames.Food;

    return `
      SELECT 
        ${meal}.id,
        ${meal}.type,
        ${meal}."date",
        json_agg(
          json_build_object(
            'id', ${food}.id,
            'name', ${food}.name,
            'measurementUnit', ${food}."measurementUnit",
            'calories', ${food}.calories,
            'quantity', "${consumedFood}".quantity 
          )
        ) as foods
      FROM ${meal}
      INNER JOIN "${consumedFood}" on meal.id = "${consumedFood}"."mealId"
      INNER JOIN ${food} on "${consumedFood}"."foodId" = ${food}.id
      WHERE ${meal}.id = ? AND ${meal}."userId" = ?
      GROUP BY ${meal}.id;
    `;
  };

  private createCalorieConsumptionQueryString = () => {
    const meal = TableNames.Meal;
    const consumedFood = TableNames.ConsumedFood;
    const food = TableNames.Food;

    return `
      SELECT 
        COALESCE(${meal}."type"::VARCHAR, 'total') as type, 
        SUM(food.calories * "${consumedFood}".quantity) as calories 
      FROM ${meal}
      INNER JOIN "${consumedFood}" on ${meal}.id = "${consumedFood}"."mealId"
      INNER JOIN ${food} on "${consumedFood}"."foodId" = ${food}.id
      WHERE ${meal}."userId" = ? AND ${meal}."date" = ?
      GROUP BY ROLLUP (${meal}.type);
    `;
  };
}
