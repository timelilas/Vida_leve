import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RouteParamsList } from "../../routes/types";
import { useEffect } from "react";

interface UseAppNavigationOptions {
  preventGoBack?: boolean;
}

export function useAppNavigation(options?: UseAppNavigationOptions) {
  const navigation = useNavigation<NavigationProp<RouteParamsList>>();

  useEffect(() => {
    const beforeRemoveUnsubscription = navigation.addListener(
      "beforeRemove",
      (e) => {
        const isGoingBack = e.data.action.type === "GO_BACK";
        if (isGoingBack && options?.preventGoBack) {
          return e.preventDefault();
        }
      }
    );

    return () => {
      beforeRemoveUnsubscription();
    };
  }, [options?.preventGoBack]);

  return navigation;
}
