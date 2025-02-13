import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import User from "../../database/models/User";
import { CreateUserDTO, UpdateUserDTO } from "./types";

export default class UserService {
  public getAll = async () => {
    try {
      const users = await User.findAll({ attributes: { exclude: ["senha"] } });
      const profiles = users.map((user) => user.getProfile());

      return profiles;
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na busca do perfil de todos os usuários.`,
        UserService.name,
        error.message
      );
    }
  };

  public create = async (params: CreateUserDTO) => {
    const { email, password } = params;

    try {
      const user = await User.create({ email, password });

      return user.getProfile();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro durante a criação do usuário com email: ${email}.`,
        UserService.name,
        error.message
      );
    }
  };

  public get = async (id: number) => {
    try {
      const foundUser = await User.findOne({
        where: { id },
        attributes: { exclude: ["senha", "createdAt", "updatedAt"] },
      });

      if (!foundUser) {
        return null;
      }

      return foundUser.getProfile();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na busca das informações do usuário com id: ${id}.`,
        UserService.name,
        error.message
      );
    }
  };

  public getUserByEmail = async (email: string) => {
    try {
      const foundUser = await User.findOne({ where: { email } });
      return foundUser?.toJSON();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na busca das informações do usuário com email: ${email}.`,
        UserService.name,
        error.message
      );
    }
  };

  public update = async (params: UpdateUserDTO) => {
    const { id, name, phone, birthDate, gender } = params;

    try {
      const [updatedCount, updatedUser] = await User.update(
        { name, phone, birthDate, gender, updatedAt: new Date() },
        { where: { id }, returning: true }
      );

      if (updatedCount < 1) {
        return null;
      }

      return (updatedUser[0] as User).getProfile();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na tentativa de atualizar o perfil do usuário com id: ${id}.`,
        UserService.name,
        error.message
      );
    }
  };

  public delete = async (id: number) => {
    try {
      const deletedCount = await User.destroy({ where: { id } });

      if (deletedCount === 0) {
        return false;
      }

      return true;
    } catch (error: any) {
      throw new DatabaseException(
        `Erro ao deletar o usuário com id: ${id}.`,
        UserService.name,
        error.message
      );
    }
  };
}
