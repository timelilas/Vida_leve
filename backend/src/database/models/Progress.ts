import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { ProgressEntity } from "../../@core/entity/progress/ProgressEntity";
import { sequelize } from "../index";
import User from "./User";
import Sequelize from "sequelize";

class Progress
  extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>>
  implements ProgressEntity
{
  declare userId: number;
  declare height: number;
  declare weight: number;
  declare goalWeight: number;
  declare activityFrequency: ProgressEntity["activityFrequency"];

  public toJSON(): ProgressEntity {
    const { height, activityFrequency, goalWeight, weight } = super.get();
    return { height, activityFrequency, goalWeight, weight };
  }
}

Progress.init(
  {
    height: {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: false,
      get() {
        const height = this.getDataValue("height");
        return parseFloat(`${height}`);
      },
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
      type: Sequelize.ENUM("pouca", "leve", "moderada", "intensa"),
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
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

User.hasOne(Progress, { foreignKey: "userId" });
Progress.belongsTo(User, { foreignKey: "userId" });

export default Progress;
