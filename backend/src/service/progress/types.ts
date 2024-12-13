import { Transaction } from "sequelize";
import { ProgressEntity } from "../../@core/entity/progress/ProgressEntity";
import { Optional, PlanType } from "../../@core/entity/@shared";

export interface UpsertProgressDTO {
  transaction?: Transaction;
  data: Optional<ProgressEntity, "currentCaloriePlan"> & {
    userId: number;
  };
}

export interface SetCaloriePlanDTO {
  userId: number;
  caloriePlan: PlanType;
}
