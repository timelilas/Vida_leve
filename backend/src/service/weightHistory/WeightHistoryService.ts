import { FindOptions, InferAttributes, Op } from "sequelize";
import WeightHistory from "../../database/models/WeightHistory";
import {
  GetWeightHistoryDTO,
  AddWeightDTO,
  GetWeightsByDateDTO,
  GetWeightByIdDTO,
  DeleteWeightDTO,
} from "./types";
import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";

export default class WeightHistoryService {
  public get = async (params: GetWeightHistoryDTO) => {
    const { userId, limit, offset } = params;

    const findWeightsQuery: FindOptions<
      InferAttributes<WeightHistory, { omit: never }>
    > = {
      limit,
      offset,
      order: [["date", "DESC"]],
      where: { userId },
    };

    try {
      const [weights, total] = await Promise.all([
        WeightHistory.findAll(findWeightsQuery),
        WeightHistory.count({ where: { userId } }),
      ]);

      const hasMore = (limit || weights.length) + (offset || 0) < total;

      return { weights: weights.map((weight) => weight.toJSON()), hasMore };
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na busca do histórico de pesos do usuário com id: '${userId}'`,
        WeightHistoryService.name,
        error.message
      );
    }
  };

  public getById = async (params: GetWeightByIdDTO) => {
    const { userId, id } = params;

    try {
      const weightHistory = await WeightHistory.findOne({
        where: { userId, id },
        attributes: { exclude: ["userId"] },
      });

      return weightHistory?.toJSON() || null;
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na busca do registro de peso com id: '${id}' do usuário com id: '${userId}'`,
        WeightHistoryService.name,
        error.message
      );
    }
  };

  public getByDate = async (params: GetWeightsByDateDTO) => {
    const { userId, from, to } = params;
    const dateOnlyFrom = from.toISOString().split("T")[0];
    const dateOnlyto = to.toISOString().split("T")[0];

    try {
      const foundWeights = await WeightHistory.findAll({
        where: { userId, date: { [Op.between]: [dateOnlyFrom, dateOnlyto] } },
      });

      return foundWeights.map((foundWeights) => foundWeights.toJSON());
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na obtenção dos pesos registrados entre as datas: '${dateOnlyFrom}' e '${dateOnlyto}' para o usuário com id: '${userId}'`,
        WeightHistoryService.name,
        error.message
      );
    }
  };

  public addWeight = async (params: AddWeightDTO) => {
    const { userId, weight, date } = params;
    try {
      const dateOnly = date.toISOString().split("T")[0];
      const addedWeightRecord = await WeightHistory.create({
        date: dateOnly,
        weight,
        userId,
      });

      return addedWeightRecord.toJSON();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na criação de um registro de peso para o usuário com id: '${userId}'`,
        WeightHistoryService.name,
        error.message
      );
    }
  };

  public delete = async (params: DeleteWeightDTO) => {
    const { userId, id } = params;
    try {
      await WeightHistory.destroy({
        where: { userId, id },
      });
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na tentativa de deletar o registro de peso com id: '${id}' do usuário com id: '${userId}'`,
        WeightHistoryService.name,
        error.message
      );
    }
  };
}
