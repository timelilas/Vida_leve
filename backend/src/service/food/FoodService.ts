import { FindOptions, InferAttributes, Op } from "sequelize";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { Food } from "../../database/associations";
import { GetFoodsDTO } from "./types";
import { transformNameIntoSlug } from "../../utils/postgres/helpers";

export default class FoodService {
  public get = async (params: GetFoodsDTO) => {
    const { name, limit, offset } = params;

    const whereQuery = name
      ? { slug: { [Op.like]: `%${transformNameIntoSlug(name)}%` } }
      : undefined;

    const findFoodsQuery: FindOptions<InferAttributes<Food, { omit: never }>> =
      {
        limit,
        offset,
        order: [["slug", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: whereQuery,
      };

    try {
      const [foods, total] = await Promise.all([
        Food.findAll(findFoodsQuery),
        Food.count({ where: whereQuery }),
      ]);

      const hasMore = (limit || foods.length) + (offset || 0) < total;

      return { foods: foods.map((food) => food.toJSON()), hasMore };
    } catch (error: any) {
      const errorMessage = name
        ? `Erro na obtençao de alimentos com nome: '${name}'.`
        : `Erro na obteção da lista de alimentos.`;

      throw new DatabaseException(
        errorMessage,
        FoodService.name,
        error.message
      );
    }
  };
}
