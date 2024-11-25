import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { ProgressEntity } from "../../@core/entity/progress/ProgressEntity";
import { sequelize } from "../index";
import User from "./User";
import Sequelize from "sequelize";

class Progress
  extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>>
  implements ProgressEntity
{
  declare id: CreationOptional<number>;
  declare userId: number;
  declare height: number;
  declare weight: number;
  declare goalWeight: number;
  declare activityFrequency: string;

  public toJSON(): Omit<ProgressEntity, "userId"> {
    const { id, height, activityFrequency, goalWeight, weight } = super.get();
    return { id, height, activityFrequency, goalWeight, weight };
  }
}

Progress.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    height: {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: false,
    },
    weight: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    goalWeight: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    activityFrequency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: "NO ACTION",
      onDelete: "NO ACTION",
    },
  },
  {
    sequelize,
    tableName: "progress",
    timestamps: false,
    freezeTableName: true,
  }
);

User.hasMany(Progress, { foreignKey: "userId" });
Progress.belongsTo(User, { foreignKey: "userId" });

export default Progress;
