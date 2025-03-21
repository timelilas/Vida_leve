import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { sequelize } from "../index";
import Sequelize from "sequelize";
import { CaloriePlanEntity } from "../../@core/entity/caloriePlan/entity";
import { allowedPlans, PlanType } from "../../@core/entity/@shared";
import { TableNames } from "../constants";
import User from "./User";

class CaloriePlan
  extends Model<
    InferAttributes<CaloriePlan>,
    InferCreationAttributes<CaloriePlan>
  >
  implements CaloriePlanEntity
{
  declare userId: ForeignKey<User["id"]>;
  declare type: PlanType;
  declare durationInDays: number;
  declare dailyCalorieIntake: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public toJSON(): CaloriePlanEntity {
    const { type, durationInDays, dailyCalorieIntake } = super.get();
    return { type, durationInDays, dailyCalorieIntake };
  }
}

CaloriePlan.init(
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      onUpdate: "NO ACTION",
      onDelete: "NO ACTION",
    },
    type: {
      type: Sequelize.ENUM<PlanType>(...allowedPlans),
      primaryKey: true,
      allowNull: false,
    },
    durationInDays: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    dailyCalorieIntake: {
      type: Sequelize.SMALLINT,
      allowNull: false,
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
    tableName: TableNames.CaloriePlan,
    timestamps: false,
    freezeTableName: true,
  }
);

export default CaloriePlan;
