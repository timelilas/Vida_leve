import { Request, Response } from "express";
import ProgressService from "../../service/progress/ProgressService";
import UserService from "../../service/user/UserService";
import { ProgressHelper } from "../../@core/entity/progress/helpers";
import { UserHelper } from "../../@core/entity/user/helpers";

export default class ProgressController {
  private _ProgressService = new ProgressService();
  private _UserService = new UserService();

  async post(req: Request, res: Response): Promise<Response> {
    const { height, weight, goalWeight, activityFrequency } = req.body;
    const { id: userId } = req.user;

    const userProfile = await this._UserService.get(userId);

    if (!userProfile?.birthDate) {
      return res.status(400).json({
        error: {
          field: null,
          message: "Data de nascimento inválida ou não cadastrada.",
        },
      });
    }
    const age = UserHelper.calculateAge(userProfile.birthDate);
    const { min, max } = ProgressHelper.calculateHealthyWeightRange(
      age,
      height
    );

    if (goalWeight < min || goalWeight > max) {
      return res.status(400).json({
        error: {
          field: "goalWeight",
          message: `O peso desejado informado está fora dos limites saudáveis. Mínimo de ${min}kg e máximo de ${max}kg.`,
        },
      });
    }

    try {
      const createdProgress = await this._ProgressService.upsert({
        height,
        weight,
        goalWeight,
        activityFrequency,
        userId: Number(userId),
      });
      return res.status(200).json({ data: createdProgress });
    } catch (error) {
      console.error("Server internal error:", error);
      return res.status(500).json({
        error: { field: null, message: "Erro na criação do progresso." },
      });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;

    const userProgress = await this._ProgressService.getIdealPlan(Number(userId));

    if (!userProgress) {
      return res.status(404).json({
        error: {
          field: null,
          message: "Progresso não encontrado.",
        },
      });
    }
    if (!userProgress?.birthDate) {
      return res.status(400).json({
        error: {
          field: null,
          message: "Data de nascimento inválida ou não cadastrada.",
        },
      });
    }
    const age = new Date().getFullYear() - new Date(userProgress.birthDate).getFullYear();

    const bmr = ProgressHelper.calculateBMR(userProgress?.gender, userProgress?.weight, userProgress.height, age);
    const tdee = ProgressHelper.calculateTDEE(bmr, userProgress?.activityFrequency);
    const weightLossPlan = ProgressHelper.calculateWeightLossPlan(tdee);

    return res.status(200).json({ 
      data: { 
        BMR: `${bmr.toFixed(2)} kcal`, 
        TDEE: `${tdee.toFixed(2)} kcal`,
        LENTA: `${weightLossPlan.slow}, kcal/dia`,
        MODERADA: `${weightLossPlan.moderate}, kcal/dia`,
        RAPIDA: `${weightLossPlan.fast}, kcal/dia`,
      } 
    });
  }
}
