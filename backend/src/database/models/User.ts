import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class Users extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Users;
