export enum RouteConstants {
  PlanSelection = "SCREEN_Shared_PlanSelection",
  Welcome = "SCREEN_Auth_Welcome",
  Login = "SCREEN_Auth_Login",
  Signup = "SCREEN_Auth_Signup",
  ProfileForm = "SCREEN_Onboarding_ProfileForm",
  ProgressForm = "SCREEN_Onboarding_ProgressForm",
  GoalGuidance = "SCREEN_Onboarding_GoalGuidance",
  Home = "SCREEN_Main_Home",
  GoalSettings = "SCREEN_Main_GoalSettings",
  ProgressSettings = "SCREEN_MAIN_ProgressSettings",
  ConnectionError = "SCREEN_Error_ConnectionError",
}

export type RouteParamsList = {
  [RouteConstants.PlanSelection]: { nextRoute: string; withModal?: boolean };
  [RouteConstants.Welcome]: undefined;
  [RouteConstants.Login]: undefined;
  [RouteConstants.Signup]: undefined;
  [RouteConstants.ProfileForm]: undefined;
  [RouteConstants.ProgressForm]: undefined;
  [RouteConstants.GoalGuidance]: undefined;
  [RouteConstants.Home]: undefined;
  [RouteConstants.GoalSettings]: undefined;
  [RouteConstants.ConnectionError]: undefined;
  [RouteConstants.ProgressSettings]: undefined;
};
