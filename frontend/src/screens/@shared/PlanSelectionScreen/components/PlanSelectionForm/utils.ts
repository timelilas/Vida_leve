import { LeafIcon } from "../../../../../components/Icons/LeafIcon";
import { LightningIcon } from "../../../../../components/Icons/LightningIcon";
import { WindIcon } from "../../../../../components/Icons/WindIcon";
import { PlanType } from "../../../../../@core/entities/@shared/planType/type";
import { SvgProps } from "react-native-svg";

interface PlanUiDetails {
  title: string;
  icon: (props: SvgProps) => JSX.Element;
}

export const planUiDetails: Record<PlanType, PlanUiDetails> = {
  gradual: {
    title: "Progresso Gradual",
    icon: LeafIcon,
  },
  moderado: {
    title: "Progresso Moderado",
    icon: WindIcon,
  },
  acelerado: {
    title: "Progresso Acelerado",
    icon: LightningIcon,
  },
};
