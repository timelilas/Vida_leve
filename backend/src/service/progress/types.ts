import { Transaction } from "sequelize";
import { ProgressEntity } from "../../@core/entity/progress/entity";
import { Optional, PlanType } from "../../@core/entity/@shared";

export interface UpsertProgressDTO {
  transaction?: Transaction;
  data: Optional<ProgressEntity, "currentCaloriePlan" |"lastWeightUpdateAt"> & {
    userId: number;
  };
}

export interface SetCaloriePlanDTO {
  transaction?: Transaction;
  data: {
    userId: number;
    caloriePlan: PlanType;
  };
}

export interface GetProgressDTO {
  transaction?: Transaction;
  userId: number;
}
