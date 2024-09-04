import User from '../database/models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/JWT';

export default class UserService {
  public post = async (userName: string | undefined, email: string, senha: string) => {
    try {
      senha = await bcrypt.hash(senha, 10);
      const user = await User.create({ userName, email, senha });
      return { type: 201, message: { message: user.id } };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  };

  public login = async (email: string, senha: string) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !user.senha) {
        return { type: 401, message: { error: 'Usuário ou senha incorretos' } };
      }

      const senhaassword = await bcrypt.compare(senha, user.senha);

      if (!senhaassword) {
        return { type: 401, message: { error: 'Senha incorreta' } };
      }

      const token = generateToken({ id: user!.id, email: user!.email, senha: user!.senha });
      return { type: 200, message: {  id: user.dataValues.id, message: token } };

    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Error logging in');
    }
  }

  public put = async (id: number, userName: string, telefone: string, aniversario: Date, sexo: string) => {
    try {
      const idUser = await User.findByPk(id)

      if (!idUser) {
        return { type: 404, message: { error: 'Usuario não logado' } };
      }

      await User.update({ 
        userName: userName ?? idUser.userName,
        telefone: telefone ?? idUser.telefone,
        aniversario: aniversario ?? idUser.aniversario,
        sexo: sexo ?? idUser.sexo,
      },
      { where: { id } }
    )
      return { type: 200, message: { message: 'Dados completado com sucesso' } }
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Error logging in');
    }
  }
}
