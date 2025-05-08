import { Request, Response } from "express";
import { exceptionResponseAdapter } from "../../utils/express/helpers";
import WeightHistoryService from "../../service/weightHistory/WeightHistoryService";
import { DEFAULT_WEIGHT_SEARCH_LIMIT } from "./constants";
import { NotFoundException } from "../../@core/exception/http/NotFoundException";
import { ConflictException } from "../../@core/exception/http/ConflictException";

export default class WeightHistoryController {
  private _weightHistoryService = new WeightHistoryService();

  async get(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const query = req.query as {
      limit?: number;
      offset?: number;
    };

    try {
      const weightHistory = await this._weightHistoryService.get({
        limit: query.limit || DEFAULT_WEIGHT_SEARCH_LIMIT,
        offset: query.offset || 0,
        userId,
      });

      return res.status(200).json({ data: weightHistory });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: `Erro ao obter o histórico de pesos do usuário com id: '${userId}'`,
      });
    }
  }

  async addWeight(req: Request, res: Response): Promise<Response> {
    const weight = req.body.weight;
    const date = new Date(req.body.date);
    const userId = req.user.id;

    try {
      const weekStartDate = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() - date.getUTCDay()
      );

      const weekEndDate = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() + 6 - date.getUTCDay()
      );

      const existingWeights = await this._weightHistoryService.getByDate({
        userId,
        from: weekStartDate,
        to: weekEndDate,
      });

      if (existingWeights.length) {
        throw new ConflictException(
          "Não é permitido registrar mais de um peso por semana.",
          WeightHistoryController.name,
          "date"
        );
      }

      const plan = await this._weightHistoryService.addWeight({
        userId,
        weight,
        date: new Date(date),
      });
      return res.status(201).json({ data: plan });
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: `Erro ao registar um novo peso para o usuário com id: '${userId}'`,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    try {
      if (Number.isNaN(id)) {
        throw new NotFoundException(
          `Peso com id '${req.params.id}' não foi encontrado.`,
          WeightHistoryController.name,
          "id"
        );
      }

      const foundWeight = await this._weightHistoryService.getById({
        userId,
        id,
      });

      if (!foundWeight) {
        throw new NotFoundException(
          `Peso com id '${req.params.id}' não foi encontrado.`,
          WeightHistoryController.name,
          "id"
        );
      }

      await this._weightHistoryService.delete({ id, userId });
      return res.status(204).send();
    } catch (error: any) {
      return exceptionResponseAdapter({
        req,
        res,
        exception: error,
        alternativeMsg: `Erro na tentativa de excluir o peso com id '${req.params.id}'`,
      });
    }
  }
}
