import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class User extends Model {
  public id!: number;
  public userName?: string;  
  public email?: string;     
  public password?: string;  
  public telephone?: string; 
  public birthDate?: Date;   
  public sex?: string;       
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
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sex: {
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
