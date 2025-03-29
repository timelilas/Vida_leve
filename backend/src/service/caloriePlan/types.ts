import { Transaction } from "sequelize";
import { CaloriePlanEntity } from "../../@core/entity/caloriePlan/entity";
import { PlanType } from "../../@core/entity/@shared";

export interface UpsertPlansDTO {
  data: { userId: number; plans: CaloriePlanEntity[] };
  transaction?: Transaction;
}

export interface GetPlanByTypeDTO {
  userId: number;
  type: PlanType;
}
