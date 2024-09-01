import { NextFunction, Request, Response } from "express";

const validateProgress = async (req: Request, res: Response, next: NextFunction) => {
    const { altura, peso, meta, atividade } = req.body;

    if(!altura || !peso || !meta || !atividade) {
        return res.status(400).json({ message: 'Todos os campos de objetivo são obrigatorios!' })
    }

    next();
};

export default { validateProgress }