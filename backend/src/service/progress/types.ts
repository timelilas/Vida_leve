import { Transaction } from "sequelize";
import { ProgressEntity } from "../../@core/entity/progress/ProgressEntity";

export interface UpsertProgressDTO extends ProgressEntity {
  userId: number;
  transaction?: Transaction;
}
