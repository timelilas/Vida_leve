import { CommonActions } from "@react-navigation/native";
import { useAppNavigation } from "../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../routes/types";
import { CaloriePlanProps } from "../../../../@core/entities/caloriePlan/type";

export function useNavigationAfterLogin() {
  const navigation = useAppNavigation();

  const homeRoute = { name: RouteConstants.Home };
  const completeProfileRoute = { name: RouteConstants.CompleteProfile };
  const createProgressRoute = { name: RouteConstants.CreateProgress };

  function navigateToProfileForm() {
    return navigation.dispatch(
      CommonActions.reset({ routes: [completeProfileRoute] })
    );
  }

  function navigateToProgressForm() {
    return navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [completeProfileRoute, createProgressRoute],
      })
    );
  }

  function navigateToPlanSelection(plans: CaloriePlanProps[]) {
    const planSelectionRoute = {
      name: RouteConstants.PlanSelection,
      params: { nextRoute: RouteConstants.GoalGuidance, plans },
    };

    return navigation.dispatch(
      CommonActions.reset({
        index: 2,
        routes: [completeProfileRoute, createProgressRoute, planSelectionRoute],
      })
    );
  }

  function naivgateToHome() {
    return navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [homeRoute] })
    );
  }

  return {
    navigateToProfileForm,
    navigateToProgressForm,
    navigateToPlanSelection,
    naivgateToHome,
  };
}
