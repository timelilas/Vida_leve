import { Model, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize';
import { sequelize } from "../config";
import Sequelize from 'sequelize';
import { UserEntity } from '../../entity/UserEntity';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserEntity {
  declare id: CreationOptional<number>;
  declare userName: string;
  declare email: string;
  declare senha: string;
  declare telefone: string | null;
  declare aniversario: Date | null;
  declare sexo: "masculino" | "feminino" | null

  public getProfile(): Omit<UserEntity, "senha">{
    const {senha, ...profileProps} = super.toJSON()
    return profileProps
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    senha: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    telefone: {
      type: Sequelize.STRING(11),
      allowNull: true,
    },
    aniversario: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    sexo: {
      type: Sequelize.ENUM("masculino", "feminino"),
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
    freezeTableName: true,
  }
);

export default User;