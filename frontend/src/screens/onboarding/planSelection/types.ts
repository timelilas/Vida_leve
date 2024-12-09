import { SvgProps } from "react-native-svg";

export type PlanType = "gradual" | "moderado" | "acelerado";

export interface CaloriePlanItem {
  type: PlanType;
  title: string;
  icon: (props: SvgProps) => JSX.Element;
  duration: number;
  targetDailyCalories: number;
}
