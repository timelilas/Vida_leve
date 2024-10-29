import User from '../../database/models/User';
import { CreateUserDTO, UpdateUserDTO } from './types';
// import bcrypt from 'bcrypt';
// import { generateToken } from '../utils/JWT';

export default class UserService {
  public getAll = async () => {
    const users = await User.findAll({ attributes:{exclude:["senha"]}});
    const usersProps = users.map((user)=>user.getProfile())
    
    return { type: 200, message: usersProps };
  };

  public create = async (params: CreateUserDTO) => {
    const {userName, senha, email} = params
    const user = await User.create({ userName, email, senha });

    return { type: 201, message: { message: user.id } };
  };

  public login = async (email: string, senha: string) => {
    try {
      const user = await User.findOne({ where: { email }});

      // const senhaassword = await bcrypt.compare(senha, user.senha);

      // if (!senhaassword) {
      //   return { type: 401, message: { error: 'Senha incorreta' } };
      // }

      return { type: 200, message: {  id: user!.dataValues.id, message: "Login completo!" } };

    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Error logging in');
    }
  }

  public update = async (params: UpdateUserDTO) => {
    const {id, userName, aniversario, sexo, telefone} = params
   
    const foundUser = await User.findOne({where: {id}, attributes: ["id"]})

    if(!foundUser){
      return null
    }

    await User.update({ 
        userName: userName,
        telefone: telefone,
        aniversario: aniversario,
        sexo: sexo
      },
      { where: { id } }
    )

    return { type: 200, message: { message: 'Dados atualizados com sucesso' } }
  }

  public delete = async (id: number) => {
    const deletedCount = await User.destroy({ where: { id } });

    if(deletedCount === 0){
      return {type: 404, message: {error: "Usuário não encontrado"}}
    }

    return { type: 200, message: { message: 'Usuário deletado com sucesso' } };
  };
}