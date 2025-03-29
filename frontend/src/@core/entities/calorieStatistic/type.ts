import { PlanType } from "../@shared/planType/type";
import { PlanStrategy } from "../@shared/panStrategy/type";

export interface CalorieStatisticProps {
  target: number;
  consumption: number;
  planType: PlanType;
  strategy: PlanStrategy;
  date: Date;
}
