import { ReactNode } from "react";
import { MealType } from "../../../@core/entities/@shared/meal/type";
import { AppleIcon } from "../../../components/Icons/AppleIcon";
import { CookieIcon } from "../../../components/Icons/CookieIcon";
import { FreshFruitsIcon } from "../../../components/Icons/FreshFruitsIcon";
import { MugIcon } from "../../../components/Icons/MugIcon";
import { SoupIcon } from "../../../components/Icons/SoupIcon";
import { colors } from "../../../styles/colors";

interface MealButtonData {
  type: MealType;
  name: string;
  icon: ReactNode;
}

export const mealButtonsData: MealButtonData[] = [
  {
    type: "cafe-da-manha",
    name: "Café da manha",
    icon: <MugIcon stroke={colors.secondary} />,
  },
  {
    type: "lanche",
    name: "Lanche",
    icon: <CookieIcon stroke={colors.secondary} />,
  },
  {
    type: "almoco",
    name: "Almoço",
    icon: <FreshFruitsIcon stroke={colors.secondary} />,
  },
  {
    type: "jantar",
    name: "Janta",
    icon: <SoupIcon stroke={colors.secondary} />,
  },
  {
    type: "outro",
    name: "Outro",
    icon: <AppleIcon stroke={colors.secondary} />,
  },
];
