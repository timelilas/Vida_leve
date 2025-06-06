import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { ProgressEntity } from "../../@core/entity/progress/entity";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import {
  ActivityFrequency,
  allowedActivityFrequencies,
  allowedPlans,
  PlanType,
} from "../../@core/entity/@shared";
import { TableNames } from "../constants";
import User from "./User";

class Progress
  extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>>
  implements ProgressEntity
{
  declare userId: ForeignKey<User["id"]>;
  declare height: number;
  declare weight: number;
  declare goalWeight: number;
  declare activityFrequency: ActivityFrequency;
  declare currentCaloriePlan: PlanType | null;
  declare lastWeightUpdateAt: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public toJSON(): ProgressEntity {
    const props = super.get();
    return {
      height: props.height,
      weight: props.weight,
      goalWeight: props.goalWeight,
      activityFrequency: props.activityFrequency,
      currentCaloriePlan: props.currentCaloriePlan,
      lastWeightUpdateAt: new Date(props.lastWeightUpdateAt),
    };
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
      type: Sequelize.ENUM<ActivityFrequency>(...allowedActivityFrequencies),
      allowNull: false,
    },
    currentCaloriePlan: {
      type: Sequelize.ENUM<PlanType>(...allowedPlans),
      allowNull: true,
    },
    lastWeightUpdateAt: {
      type: Sequelize.DATE(),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 3),
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      onUpdate: "NO ACTION",
      onDelete: "NO ACTION",
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
    tableName: TableNames.Progress,
    timestamps: false,
    freezeTableName: true,
  }
);

export default Progress;
