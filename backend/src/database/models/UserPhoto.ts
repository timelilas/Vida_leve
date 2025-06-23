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
import { UserPhotoEntity } from "../../@core/entity/UserPhoto/entity";
import { table } from "console";
import { TableNames } from "../constants";

export class UserPhoto extends Model<
  InferAttributes<UserPhoto>,
  InferCreationAttributes<UserPhoto>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare photoUrl: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public toJSON(): UserPhotoEntity {
    const props = super.get();
    return {
      id: props.id,
      userId: props.userId,
      photoUrl: props.photoUrl,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}

UserPhoto.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: "INTEGER",
      allowNull: false,
    },
    photoUrl: {
      type: "TEXT",
      allowNull: false,
    },
    createdAt: {
      type: "DATE",
      allowNull: false,
    },
    updatedAt: {
      type: "DATE",
      allowNull: false,
    },
  },
  {
    sequelize,// Assuming sequelize instance is set
    tableName: TableNames.UserPhoto,
    timestamps: true,
    freezeTableName: true,
  }
);

export default UserPhoto;