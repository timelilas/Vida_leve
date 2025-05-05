import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import Sequelize from "sequelize";
import { sequelize } from "../index";
import User from "./User";
import { TableNames } from "../constants";
import {
  allowedPlans,
  PlanType,
  StrategyType,
} from "../../@core/entity/@shared";
import { PlanHistoryEntity } from "../../@core/entity/planHistory/entity";

class PlanHistory extends Model<
  InferAttributes<PlanHistory>,
  InferCreationAttributes<PlanHistory>>
{
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare dailyCalorieIntake: number;
  declare planType: PlanType;
  declare date: string;
  declare strategy: StrategyType;

  public toJSON(): PlanHistoryEntity {
    const props = super.get();
    return {
      id: props.id,
      userId: props.userId,
      dailyCalorieIntake: props.dailyCalorieIntake,
      planType: props.planType,
      date: new Date(props.date),
      strategy: props.strategy,
    };
  }
}

PlanHistory.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dailyCalorieIntake: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    planType: {
      type: Sequelize.ENUM(...allowedPlans),
      allowNull: false,
    },
    strategy: {
      type: Sequelize.ENUM("deficit", "superavit"),
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: TableNames.PlanHistory,
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "date"],
        using: "BTREE",
      },
    ],
  }
);

export default PlanHistory;
