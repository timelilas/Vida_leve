import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../index";
import User from "./User";
import Sequelize from "sequelize";
import { CaloriePlanEntity } from "../../@core/entity/caloriePlan/entity";
import { allowedPlans, PlanType } from "../../@core/entity/@shared";

class CaloriePlan
  extends Model<
    InferAttributes<CaloriePlan>,
    InferCreationAttributes<CaloriePlan>
  >
  implements CaloriePlanEntity
{
  declare userId: number;
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
    tableName: "caloriePlan",
    timestamps: false,
    freezeTableName: true,
  }
);

User.hasMany(CaloriePlan, { foreignKey: "userId" });
CaloriePlan.belongsTo(User, { foreignKey: "userId" });

export default CaloriePlan;
