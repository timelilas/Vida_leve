import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RouteParamsList } from "../routes/types";

export function useAppNavigation() {
  const navigation = useNavigation<NavigationProp<RouteParamsList>>();

  return navigation;
}
