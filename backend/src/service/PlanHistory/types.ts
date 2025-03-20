import { PlanType } from "../../@core/entity/@shared";

export interface PlanHistoryDTO {
    userId: number;
    dailyCalorieIntake: number;
    planType: PlanType;
    date: Date;
};