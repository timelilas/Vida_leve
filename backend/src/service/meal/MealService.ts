import { Op, QueryTypes } from "sequelize";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { sequelize } from "../../database";
import { ConsumedFood, Meal } from "../../database/associations";
import {
  CalorieConsumtionQueryResult,
  UpsertMealDTO,
  GetCalorieConsumptionDTO,
  GetMealByIdDTO,
  MealQueryResult,
  SearchMealDTO,
  GetMealsDTO,
} from "./types";
import { TableNames } from "../../database/constants";
import { TypeMeal } from "../../@core/entity/@shared";
import { MealEntity } from "../../@core/entity/meal/enitys";

type By = "ID" | "DATE" | "DATE_AND_TYPE";

interface MealQueryOptions {
  by?: By;
  withLimit?: boolean;
  withOffset?: boolean;
}

export default class MealService {
  public getById = async (params: GetMealByIdDTO) => {
    const { id, userId } = params;
    const queryString = this.getMealQueryString({ by: "ID" });

    try {
      const foundMeal = await sequelize.query<MealQueryResult>(queryString, {
        type: QueryTypes.SELECT,
        replacements: [userId, id],
      });

      const mealEntity: MealEntity | null = foundMeal[0]
        ? { ...foundMeal[0], date: new Date(foundMeal[0].date) }
        : null;

      return mealEntity;
    } catch (error: any) {
      throw new DatabaseException(
        `Ocorreu um erro durante a busca da reifeição com id: '${id}'`,
        MealService.name,
        error.message
      );
    }
  };

  public getMeals = async (params: GetMealsDTO) => {
    const { userId, date, limit, offset } = params;
    const isoDate = date?.toISOString().split("T")[0];
    const mealQueryString = this.getMealQueryString({
      by: date ? "DATE" : undefined,
      withLimit: !!limit,
      withOffset: !!offset,
    });

    const replacements = [userId, isoDate, limit, offset].filter(
      (replacement) => typeof replacement !== "undefined"
    );

    try {
      const [rawMeals, total] = await Promise.all([
        await sequelize.query<MealQueryResult>(mealQueryString, {
          type: QueryTypes.SELECT,
          replacements,
        }),
        await Meal.count({
          where: isoDate ? { userId, date: isoDate } : { userId },
        }),
      ]);

      const hasMore = (limit || rawMeals.length) + (offset || 0) < total;
      const meals: MealEntity[] = rawMeals.map((rawMeal) => ({
        ...rawMeal,
        date: new Date(rawMeal.date),
      }));

      return { meals, hasMore };
    } catch (error: any) {
      const errorMessage = `Ocorreu um erro ao tentar obter as refeições do usuaŕio com id: '${params.userId}'`;
      throw new DatabaseException(
        errorMessage,
        MealService.name,
        error.message
      );
    }
  };

  public searchMeal = async (params: SearchMealDTO) => {
    const { date, mealType, userId } = params;
    const isoDateString = date.toISOString().split("T")[0];
    const queryString = this.getMealQueryString({ by: "DATE_AND_TYPE" });

    try {
      const foundMeal = await sequelize.query<MealQueryResult>(queryString, {
        type: QueryTypes.SELECT,
        replacements: [userId, isoDateString, mealType],
      });

      const mealEntity: MealEntity | null = foundMeal[0]
        ? { ...foundMeal[0], date: new Date(foundMeal[0].date) }
        : null;
      return mealEntity;
    } catch (error: any) {
      const errorMessage = `Ocorreu um erro durante a buscada refeição do tipo '${mealType}' referente a data '${date}'`;
      throw new DatabaseException(
        errorMessage,
        MealService.name,
        error.message
      );
    }
  };

  public upsert = async (params: UpsertMealDTO) => {
    const { id, userId, date, foods, mealType } = params;
    const foodIds = foods.map((food) => food.foodId);
    let transaction = null;

    try {
      transaction = await sequelize.transaction();
      const operationTimestamp = new Date();
      const [upsertedMeal] = await Meal.upsert(
        {
          id,
          userId,
          date: date.toISOString().split("T")[0],
          type: mealType,
          updatedAt: operationTimestamp,
          createdAt: id ? undefined : operationTimestamp,
        },
        { transaction, returning: true }
      );

      if (id) {
        await ConsumedFood.destroy({
          where: {
            foodId: { [Op.notIn]: foodIds },
            mealId: id,
          },
          transaction: transaction,
        });
      }

      await ConsumedFood.bulkCreate(
        foods.map(({ foodId, quantity }, i) => {
          return {
            mealId: upsertedMeal.id,
            foodId,
            quantity,
            position: i + 1,
          };
        }),
        { transaction, updateOnDuplicate: ["quantity", "position"] }
      );

      await transaction.commit();

      const mealEntity = await this.getById({ id: upsertedMeal.id, userId });
      return mealEntity as MealEntity;
    } catch (error: any) {
      await transaction?.rollback();
      throw new DatabaseException(
        `Ocorreu um erro durante a criação da refeição.`,
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
      const errorMessage = `Ocorreu um erro ao obter consumo de calorias do usuário: ${params.userId}, referente a data: ${isoDate}`;
      throw new DatabaseException(
        errorMessage,
        MealService.name,
        error.message
      );
    }
  };

  private getMealQueryString = ({
    by,
    withLimit,
    withOffset,
  }: MealQueryOptions) => {
    const meal = TableNames.Meal;
    const consumedFood = TableNames.ConsumedFood;
    const food = TableNames.Food;

    const whereClauseMap: Record<By, string> = {
      ID: `${meal}."userId" = ? AND ${meal}.id = ?`,
      DATE: `${meal}."userId" = ? AND ${meal}.date = ?`,
      DATE_AND_TYPE: `${meal}."userId" = ? AND ${meal}.date = ? AND ${meal}.type = ?`,
    };

    const whereClause = by ? whereClauseMap[by] : `${meal}."userId" = ?`;
    const limitClause = withLimit ? "LIMIT ?" : "";
    const offsetClause = withOffset ? "OFFSET ?" : "";

    const subQuery = `
      SELECT 
        ${meal}.id as id,
        ${meal}.type as type,
        ${meal}.date as date,
        "${consumedFood}"."foodId" as "foodId",
        "${consumedFood}".quantity as "foodQuantity",
        ${food}.slug as "foodSlug",
        ${food}."name"  as "foodName",
        ${food}."measurementUnit"  as "measurementUnit",
        ${food}.calories as "foodCalories"
      FROM ${meal}
      LEFT OUTER JOIN "${consumedFood}" on "${consumedFood}"."mealId" = ${meal}.id
      LEFT OUTER JOIN ${food} ON "${consumedFood}"."foodId" = ${food}.id
      WHERE ${whereClause}
      ORDER BY ${meal}.id ASC, "${consumedFood}"."position" ASC
    `;

    const mainQuery = `
      SELECT 
        id, date, type,
        json_agg(
            CASE WHEN "foodId" is not null THEN 
              json_build_object(
                'id', "foodId",
                'name', "foodName",
                'measurementUnit', "measurementUnit",
                'calories', "foodCalories",
                'quantity', "foodQuantity" 
                )
            END
        ) as foods
      FROM (${subQuery}) as "temporary"
      GROUP BY id, date, type
      ${`${limitClause} ${offsetClause}`.trim()}
    `;

    return mainQuery;
  };

  private createCalorieConsumptionQueryString = () => {
    const meal = TableNames.Meal;
    const consumedFood = TableNames.ConsumedFood;
    const food = TableNames.Food;

    return `
      SELECT 
        COALESCE(${meal}."type"::VARCHAR, 'total') as type, 
        COALESCE(SUM(food.calories * "${consumedFood}".quantity), 0)::INTEGER as calories 
      FROM ${meal}
      INNER JOIN "${consumedFood}" on ${meal}.id = "${consumedFood}"."mealId"
      INNER JOIN ${food} on "${consumedFood}"."foodId" = ${food}.id
      WHERE ${meal}."userId" = ? AND ${meal}."date" = ?
      GROUP BY ROLLUP (${meal}.type);
    `;
  };
}
