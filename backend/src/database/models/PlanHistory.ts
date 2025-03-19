import { 
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model 
} from "sequelize";
import Sequelize from "sequelize";
import { sequelize } from "../index";
import { PlanHistoryEntity } from "../../@core/entity/plan-history/entity";
import User from "./User";
import { TableNames } from "../constants";
import { PlanType } from "../../@core/entity/@shared";

class PlanHistory 
    extends Model<InferAttributes<PlanHistory>, InferCreationAttributes<PlanHistory>>
    implements PlanHistoryEntity
{
    declare id : CreationOptional<number>;
    declare userId: ForeignKey<User["id"]>;
    declare dailyCalorieIntake: number;
    declare PlanType: PlanType;
    declare date: Date;

    public toJSON(): PlanHistoryEntity {
        const props = super.get();
        return {
            id: props.id,
            userId: props.userId,
            dailyCalorieIntake: props.dailyCalorieIntake,
            PlanType: props.PlanType,
            date: props.date,
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
        PlanType: {
            type: Sequelize.ENUM("gradual", "moderado", "acelerado"),
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName:  TableNames.PlanHistory,
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
)

export default PlanHistory;
