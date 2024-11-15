import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import { UserEntity } from "../../entity/UserEntity";

class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements UserEntity
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare name: string | null;
  declare phone: string | null;
  declare birthDate: Date | null;
  declare gender: "masculino" | "feminino" | null;

  public getProfile(): Omit<UserEntity, "password"> {
    const { password, ...profileProps } = super.toJSON();
    return profileProps;
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(11),
      allowNull: true,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: Sequelize.ENUM("masculino", "feminino"),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user",
    timestamps: false,
    freezeTableName: true,
  }
);

export default User;
