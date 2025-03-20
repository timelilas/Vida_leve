import { PlanType } from "../../@core/entity/@shared";

export interface PlanHistoryDTO {
    userId: number;
    dailyCalorieIntake: number;
    PlanType: PlanType;
    date: Date;
};