import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { sequelize } from "../../database";
import ConsumedFood from "../../database/models/ConsumedFood";
import Meal from "../../database/models/Meal";
import { CreateMealDTO } from "./types";

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

      const result = await ConsumedFood.bulkCreate(
        params.foods.map(({ foodId, quantity }) => {
          return { mealId: createdMeal.id, foodId, quantity };
        }),
        { transaction }
      );

      return {
        ...createdMeal.toJSON(),
        foods: result.map((item) => item.toJSON()),
      };
    } catch (error: any) {
      transaction?.rollback();
      throw new DatabaseException(
        `Erro durante a criação da refeição do usuário com id: ${params.userId}.`,
        MealService.name,
        error.message
      );
    }
  };
}
