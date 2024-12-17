import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import { UserEntity } from "../../@core/entity/user/entity";
import { allowedGenders, Gender } from "../../@core/entity/@shared";

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
  declare gender: Gender | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public getProfile(): Omit<UserEntity, "password"> {
    const props = super.toJSON();
    return {
      id: props.id,
      name: props.name,
      email: props.email,
      birthDate: props.birthDate,
      phone: props.phone,
      gender: props.gender,
    };
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
    gender: {
      type: Sequelize.ENUM<Gender>(...allowedGenders),
      allowNull: true,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      get() {
        const birthDate = this.getDataValue("birthDate");
        return birthDate ? new Date(birthDate) : null;
      },
    },
    createdAt: {
      type: Sequelize.DATE(),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 3),
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE(),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 3),
      allowNull: false,
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
