import User from "../../database/models/User";
import { CreateUserDTO, UpdateUserDTO } from "./types";

export default class UserService {
  public getAll = async () => {
    const users = await User.findAll({ attributes: { exclude: ["senha"] } });
    const profiles = users.map((user) => user.getProfile());

    return profiles;
  };

  public create = async (params: CreateUserDTO) => {
    const { email, password } = params;
    const user = await User.create({ email, password });

    return user.getProfile();
  };

  public get = async (id: number) => {
    const foundUser = await User.findOne({
      where: { id },
      attributes: { exclude: ["senha"] },
    });

    if (!foundUser) {
      return null;
    }

    return foundUser.getProfile();
  };

  public getUserByEmail = async (email: string) => {
    const foundUser = await User.findOne({ where: { email } });
    return foundUser?.toJSON();
  };

  public update = async (params: UpdateUserDTO) => {
    const { id, name, phone, birthDate, gender } = params;

    const foundUser = await User.findOne({ where: { id }, attributes: ["id"] });

    if (!foundUser) {
      return null;
    }

    await User.update({ name, phone, birthDate, gender }, { where: { id } });

    const updatedUser = await User.findOne({
      where: { id },
      attributes: { exclude: ["senha"] },
    });
    return (updatedUser as User).getProfile();
  };

  public delete = async (id: number) => {
    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return false;
    }

    return true;
  };
}
