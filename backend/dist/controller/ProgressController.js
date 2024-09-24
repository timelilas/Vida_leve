"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgressService_1 = __importDefault(require("../services/ProgressService"));
class ProgressController {
    constructor() {
        this._ProgressService = new ProgressService_1.default();
    }
    async post(req, res) {
        const { altura, peso, meta, atividade } = req.body;
        const { id } = req.params;
        const userId = id;
        try {
            const { type, message } = await this._ProgressService.post(altura, peso, meta, atividade, Number(userId));
            return res.status(type).json(message);
        }
        catch (error) {
            console.error('Error in UserController:', error);
            return res.status(500).json({ error: 'Error creating user' });
        }
    }
    ;
}
exports.default = ProgressController;
;
