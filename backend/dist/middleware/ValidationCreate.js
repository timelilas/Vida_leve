"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../database/models/User"));
const validateUser = async (req, res, next) => {
    const { email, senha } = req.body;
    const emailExist = await User_1.default.findOne({ where: { email } });
    if (emailExist) {
        return res.status(400).json({ message: 'Email já cadastrado' });
    }
    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha obrigatorio' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email invalido' });
    }
    const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!senhaRegex.test(senha)) {
        return res.status(400).json({ message: 'Preencha a senha com os dados pedido' });
    }
    next();
};
const validateLogin = async (req, res, next) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha obrigatorio' });
    }
    const emailExist = await User_1.default.findOne({ where: { email } });
    if (!emailExist) {
        return res.status(400).json({ message: 'Email não cadastrado' });
    }
    const senhaExist = await User_1.default.findOne({ where: { senha } });
    if (senhaExist) {
        return res.status(400).json({ message: 'Senha invalida' });
    }
    next();
};
const validateProfile = async (req, res, next) => {
    const { telefone, aniversario, sexo } = req.body;
    if (!telefone || !aniversario || !sexo) {
        return res.status(400).json({ message: 'Os compos de telefone, aniversario e sexo o são obrigatorios!' });
    }
    next();
};
exports.default = { validateUser, validateLogin, validateProfile };
