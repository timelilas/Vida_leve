import { LeafIcon } from "../../../../../components/icons/LeafIcon";
import { LightningIcon } from "../../../../../components/icons/LightningIcon";
import { WindIcon } from "../../../../../components/icons/WindIcon";
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
