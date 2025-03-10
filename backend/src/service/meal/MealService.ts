import { QueryTypes } from "sequelize";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { sequelize } from "../../database";
import { ConsumedFood, Food, Meal } from "../../database/associations";
import { CreateMealDTO } from "./types";
import { TableNames } from "../../database/constants";
import { MealEntity } from "../../@core/entity/meal/enitys";

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

      const queryResult = await sequelize.query<MealEntity>(
        this.createMealQueryString(),
        { type: QueryTypes.SELECT, replacements: [createdMeal.id] }
      );

      return queryResult[0];
    } catch (error: any) {
      await transaction?.rollback();
      throw new DatabaseException(
        `Erro durante a criação da refeição do usuário com id: ${params.userId}.`,
        MealService.name,
        error.message
      );
    }
  };

  private createMealQueryString = () => {
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
      WHERE ${meal}.id = ?
      GROUP BY ${meal}.id;
    `;
  };
}
