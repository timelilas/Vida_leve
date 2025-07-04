import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../index";
import { TableNames } from "../constants";
import { UserEntity } from "../../@core/entity/user/entity";
import { allowedGenders, Gender } from "../../@core/entity/@shared";
import Sequelize from "sequelize";

class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements Omit<UserEntity, "birthDate" | "registrationDate">
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare name: string | null;
  declare phone: string | null;
  declare birthDate: string | null;
  declare gender: Gender | null;
  declare imageUrl: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public getProfile(): Omit<UserEntity, "password"> {
    const props = super.toJSON();
    return {
      id: props.id,
      name: props.name,
      email: props.email,
      phone: props.phone,
      gender: props.gender,
      imageUrl: props.imageUrl,
      birthDate: props.birthDate ? new Date(props.birthDate) : null,
      registrationDate: new Date(props.createdAt),
    };
  }

  public toJSON(): UserEntity {
    const props = super.toJSON();
    return {
      id: props.id,
      name: props.name,
      email: props.email,
      password: props.password,
      phone: props.phone,
      gender: props.gender,
      imageUrl: props.imageUrl,
      birthDate: props.birthDate ? new Date(props.birthDate) : null,
      registrationDate: new Date(props.createdAt),
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
    imageUrl: {
      type: Sequelize.TEXT,
      allowNull: true,
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
    tableName: TableNames.User,
    timestamps: false,
    freezeTableName: true,
  }
);

export default User;
