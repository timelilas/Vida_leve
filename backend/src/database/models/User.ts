import { Model, DataTypes } from 'sequelize';
import sequelize from '.';
import Progress from './Progress';

class User extends Model {
  public id!: number;
  public userName?: string;
  public email?: string;
  public senha?: string;
  public telefone?: string;
  public aniversario?: Date;
  public sexo?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aniversario: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
    freezeTableName: true,
  }
);

export default User;
