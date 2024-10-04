"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateProgress = async (req, res, next) => {
    const { altura, peso, meta, atividade } = req.body;
    if (!altura || !peso || !meta || !atividade) {
        return res.status(400).json({ message: 'Todos os campos de objetivo são obrigatorios!' });
    }
    next();
};
exports.default = { validateProgress };
