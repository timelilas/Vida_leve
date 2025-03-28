import { validPlanStrategies } from "./constants";

export type PlanStrategy = (typeof validPlanStrategies)[number];
