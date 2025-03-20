import { PlanType } from "../@shared";

export interface PlanHistoryEntity {
    id: number;
    userId: number;
    dailyCalorieIntake: number;
    PlanType: PlanType;
    date: Date;
}
    