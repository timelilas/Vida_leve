import { Op } from "sequelize";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import Food from "../../database/models/Food";
import { GetFoodsDTO } from "./types";
import { transformNameIntoSlug } from "../../utils/postgres/helpers";

export default class FoodService {
  public get = async (params: GetFoodsDTO) => {
    const whereOptions = params.filter?.name
      ? { slug: { [Op.like]: `${transformNameIntoSlug(params.filter.name)}%` } }
      : undefined;

    try {
      const foods = await Food.findAll({
        where: whereOptions,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      return foods.map((food) => food.toJSON());
    } catch (error: any) {
      const foodName = params.filter?.name;
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
