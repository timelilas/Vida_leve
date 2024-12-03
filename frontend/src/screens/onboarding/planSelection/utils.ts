import { LeafIcon } from "../../../components/icons/LeafIcon";
import { LightningIcon } from "../../../components/icons/LightningIcon";
import { WindIcon } from "../../../components/icons/WindIcon";
import { CaloriePlanItem } from "./types";

export const caloriePlans: CaloriePlanItem[] = [
  {
    type: "gradual",
    title: "Progresso Gradual",
    icon: LeafIcon,
    duration: 15,
    targetDailyCalories: 1800,
  },
  {
    type: "moderado",
    title: "Progresso Moderado",
    icon: WindIcon,
    duration: 11,
    targetDailyCalories: 1600,
  },
  {
    type: "acelerado",
    title: "Progresso Acelerado",
    icon: LightningIcon,
    duration: 7,
    targetDailyCalories: 1360,
  },
];
