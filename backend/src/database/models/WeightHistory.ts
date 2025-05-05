import { 
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";
import Sequelize from "sequelize";
import { sequelize } from "../index";
import User from "./User";
import { WeightHistoryEntity } from "../../@core/entity/WeightHistoryEntity/entity";
import { TableNames } from "../constants";

class WeightHistory extends Model<
    InferAttributes<WeightHistory>,
    InferCreationAttributes<WeightHistory>>
{
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User["id"]>;
    declare weight: number;
    declare date: string;
    
    public toJSON(): WeightHistoryEntity {
        const props = super.get();
        return {
            id: props.id,
            userId: props.userId,
            weight: props.weight,
            date: new Date(props.date), 
        };
    }
}

WeightHistory.init(
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
        weight: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    },
    {
      sequelize,
      tableName: TableNames.WeightHistory,
      timestamps: false,
      freezeTableName: true,
    }
);

export default WeightHistory;