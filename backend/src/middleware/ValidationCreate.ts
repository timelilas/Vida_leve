import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/User';

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const emailExist = await Users.findOne({ where: { email } });

    if (emailExist) {
        return res.status(400).json({ message: 'Email já cadastrado' });
    }

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha obrigatorio' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email invalido' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Preencha a senha com os dados pedido' });
    }
    
    next();
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha obrigatorio' });
    }

    const emailExist = await Users.findOne({ where: { email } });

    if (!emailExist) {
        return res.status(400).json({ message: 'Email não cadastrado' });
    }

    const passwordExist = await Users.findOne({ where: { password } });

    if (passwordExist) {
        return res.status(400).json({ message: 'Senha invalida' });
    }

    next();
}

export default { validateUser, validateLogin };
