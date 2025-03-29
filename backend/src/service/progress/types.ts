import { Transaction } from "sequelize";
import { ProgressEntity } from "../../@core/entity/progress/entity";
import { Optional, PlanType } from "../../@core/entity/@shared";

export interface UpsertProgressDTO {
  transaction?: Transaction;
  data: Optional<ProgressEntity, "currentCaloriePlan"> & {
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
