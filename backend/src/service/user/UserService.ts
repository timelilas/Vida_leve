import { DatabaseException } from "../../@core/exception/infrastructure/DatabaseException";
import { User } from "../../database/associations";
import { CreateUserDTO, UpdateUserDTO } from "./types";

export default class UserService {
  public create = async (params: CreateUserDTO) => {
    const { email, password } = params;

    try {
      const user = await User.create({ email, password });

      return user.getProfile();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro durante a criação do usuário com email: '${email}'.`,
        UserService.name,
        error.message
      );
    }
  };

  public get = async (id: number) => {
    try {
      const foundUser = await User.findOne({
        where: { id },
        attributes: { exclude: ["password", "updatedAt"] },
      });

      if (!foundUser) {
        return null;
      }

      return foundUser.getProfile();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na busca das informações do usuário com id: '${id}'.`,
        UserService.name,
        error.message
      );
    }
  };

  public getUserByEmail = async (email: string) => {
    try {
      const foundUser = await User.findOne({ where: { email } });
      return foundUser?.toJSON() || null;
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na busca das informações do usuário com email: '${email}'.`,
        UserService.name,
        error.message
      );
    }
  };

  public update = async (params: UpdateUserDTO) => {
    const { id, name, phone, birthDate, gender, imageUrl } = params;
    const birthDateISOString = birthDate?.toISOString().split("T")[0];

    try {
      const [updatedCount, updatedUser] = await User.update(
        {
          name,
          phone,
          gender,
          birthDate: birthDateISOString,
          imageUrl,
          updatedAt: new Date(),
        },
        { where: { id }, returning: true }
      );

      if (updatedCount < 1) {
        return null;
      }

      return updatedUser[0].getProfile();
    } catch (error: any) {
      throw new DatabaseException(
        `Erro na tentativa de atualizar o perfil do usuário com id: '${id}'.`,
        UserService.name,
        error.message
      );
    }
  };
}
