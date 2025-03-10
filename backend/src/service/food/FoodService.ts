import { FindOptions, InferAttributes, Op } from "sequelize";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { Food } from "../../database/associations";
import { GetFoodsDTO } from "./types";
import { transformNameIntoSlug } from "../../utils/postgres/helpers";

export default class FoodService {
  public get = async (params: GetFoodsDTO) => {
    const { filter } = params;

    const whereQuery = filter?.name
      ? { slug: { [Op.like]: `%${transformNameIntoSlug(filter.name)}%` } }
      : undefined;

    const findFoodsQuery: FindOptions<InferAttributes<Food, { omit: never }>> =
      {
        limit: filter?.limit,
        offset: filter?.offset,
        order: [["slug", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: whereQuery,
      };

    try {
      const [foods, total] = await Promise.all([
        Food.findAll(findFoodsQuery),
        Food.count({ where: whereQuery }),
      ]);

      const hasMore =
        (filter?.limit || foods.length) + (filter?.offset || 0) < total;

      return { foods: foods.map((food) => food.toJSON()), hasMore };
    } catch (error: any) {
      const foodName = filter?.name;
      const errorMessage = foodName
        ? `Erro na busca de alimentos com nome: ${foodName}.`
        : `Erro durante a busca de alimentos.`;

      throw new DatabaseException(
        errorMessage,
        FoodService.name,
        error.message
      );
    }
  };
}
