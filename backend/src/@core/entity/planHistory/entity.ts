import { PlanType, StrategyType } from "../@shared";

export interface PlanHistoryEntity {
  id: number;
  userId: number;
  dailyCalorieIntake: number;
  planType: PlanType;
  strategy: StrategyType;
  date: Date;
}
