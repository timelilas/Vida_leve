import User from '../../database/models/User';
import { CreateUserDTO, UpdateUserDTO } from './types';

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

  public getUserByEmail = async (email: string) => {
    const foundUser = await User.findOne({where: {email}})
    return foundUser?.toJSON()
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