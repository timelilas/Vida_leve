import { CommonActions } from "@react-navigation/native";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../../routes/types";

export function useNavigationAfterLogin() {
  const navigation = useAppNavigation();

  const homeRoute = { name: RouteConstants.Home };
  const profileFormRoute = { name: RouteConstants.ProfileForm };
  const progressFormRoute = { name: RouteConstants.ProgressForm };
  const planSelectionRoute = {
    name: RouteConstants.PlanSelection,
    params: { nextRoute: RouteConstants.GoalGuidance },
  };

  function navigateToProfileForm() {
    return navigation.dispatch(
      CommonActions.reset({ routes: [profileFormRoute] })
    );
  }

  function navigateToProgressForm() {
    return navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [profileFormRoute, progressFormRoute],
      })
    );
  }

  function navigateToPlanSelection() {
    return navigation.dispatch(
      CommonActions.reset({
        index: 2,
        routes: [profileFormRoute, progressFormRoute, planSelectionRoute],
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
