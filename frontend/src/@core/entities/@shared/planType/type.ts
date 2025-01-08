import { validPlanTypes } from "./constants";

export type PlanType = (typeof validPlanTypes)[number];
