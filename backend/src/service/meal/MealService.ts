import { Op, QueryTypes } from "sequelize";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { sequelize } from "../../database";
import { ConsumedFood, Meal } from "../../database/associations";
import {
  CalorieStatisticsQueryResult,
  UpsertMealDTO,
  GetCalorieStatisticsDTO,
  GetMealByIdDTO,
  MealQueryResult,
  SearchMealDTO,
  GetMealsDTO,
} from "./types";
import { TableNames } from "../../database/constants";
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
        `Ocorreu um erro durante a busca da reifeição com id: '${id}'.`,
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
      const errorMessage = `Ocorreu um erro ao tentar obter as refeições do usuaŕio com id: '${params.userId}'.`;
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
      const errorMessage = `Ocorreu um erro durante a buscada refeição do tipo '${mealType}' referente a data '${isoDateString}'.`;
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

  public getCalorieStatistics = async (params: GetCalorieStatisticsDTO) => {
    const from = params.from.toISOString().split("T")[0];
    const to = params.to.toISOString().split("T")[0];
    const userId = params.userId;
    const queryString = this.getCalorieStatisticsQuery();

    try {
      const queryResult = await sequelize.query<CalorieStatisticsQueryResult>(
        queryString,
        { type: QueryTypes.SELECT, replacements: [from, to, userId, userId] }
      );

      const parsedResult = queryResult.map(({ date, ...rest }) => {
        return { ...rest, date: new Date(date) };
      });

      return parsedResult;
    } catch (error: any) {
      const errorMessage = `Erro na consulta das estatisticas do consumo de calorias entre os dias, '${from}' e '${to}' do usuário com id: '${userId}'`;
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

  private getCalorieStatisticsQuery = () => {
    const meal = TableNames.Meal;
    const consumedFood = TableNames.ConsumedFood;
    const food = TableNames.Food;
    const planHistory = TableNames.PlanHistory;

    return `
      SELECT
        date("generatedDate") as date,
        "dailyCalorieIntake" as target,
        COALESCE("dailyConsumption", 0)::INT as consumption,
        "planType",
        strategy
      FROM GENERATE_SERIES(? ::DATE, ? ::DATE, interval '1 day') as "generatedDate"
      LEFT JOIN LATERAL (
        SELECT *
        FROM "${planHistory}"
        WHERE "${planHistory}"."userId" = ? and "${planHistory}".date <= "generatedDate".date
        ORDER BY "${planHistory}".date DESC
        LIMIT 1
      ) as "userPlanHistory" ON true
      LEFT JOIN (
        SELECT date, sum(quantity * calories) as "dailyConsumption"
        FROM ${meal} 
        INNER JOIN "${consumedFood}" ON ${meal}.id = "${consumedFood}"."mealId" 
        INNER JOIN ${food} ON "${consumedFood}"."foodId"  = ${food}.id 
        WHERE "userId" = ?
        group by ${meal}.date
      ) as "calorieConsumption" ON "calorieConsumption"."date" = "generatedDate"
      WHERE id IS NOT NULL;
    `;
  };
}
