import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../index";
import { TableNames } from "../constants";
import Sequelize from "sequelize";
import { FoodEntity } from "../../@core/entity/food/entity";

class Food
  extends Model<InferAttributes<Food>, InferCreationAttributes<Food>>
  implements FoodEntity
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: string;
  declare measurementUnit: string;
  declare calories: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public toJSON(): FoodEntity {
    const props = super.toJSON();
    return {
      id: props.id,
      name: props.name,
      measurementUnit: props.measurementUnit,
      calories: props.calories,
    };
  }
}

Food.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    measurementUnit: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    calories: {
      type: Sequelize.INTEGER(),
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
    tableName: TableNames.Food,
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        fields: ["slug"],
        using: "BTREE",
      },
    ],
  }
);

export default Food;
