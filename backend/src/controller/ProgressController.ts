import { Request, Response,  } from "express";
import ProgressService from "../services/ProgressService";

export default class ProgressController {
    private _ProgressService = new ProgressService();

    async post(req: Request, res: Response): Promise<Response> {
        const { altura, peso, meta, atividade } = req.body;

        const { id } = req.params;
        const userId = id;

        try {
            const { type, message } = await this._ProgressService.post(altura, peso, meta, atividade, Number(userId));
            return res.status(type).json(message);
        } catch (error) {
            console.error('Error in UserController:', error);
            return res.status(500).json({ error: 'Error creating user' });
        }
    };
};