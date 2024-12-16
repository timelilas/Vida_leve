import { Transaction } from "sequelize";
import { CaloriePlanEntity } from "../../@core/entity/caloriePlan/entity";

export interface UpsertPlansDTO {
  data: { userId: number; plans: CaloriePlanEntity[] };
  transaction?: Transaction;
}
