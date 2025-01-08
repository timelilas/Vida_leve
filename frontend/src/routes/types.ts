export enum RouteConstants {
  Welcome = "SCREEN_Auth_Welcome",
  Login = "SCREEN_Auth_Login",
  Signup = "SCREEN_Auth_Signup",
  ProfileForm = "SCREEN_Onboarding_ProfileForm",
  ProgressForm = "SCREEN_Onboarding_ProgressForm",
  PlanSelection = "SCREEN_Onboarding_PlanSelection",
  GoalGuidance = "SCREEN_Onboarding_GoalGuidance",
  Home = "SCREEN_Main_Home",
  ConnectionError = "SCREEN_Error_ConnectionError",
}

export type RouteParamsList = {
  [RouteConstants.Welcome]: undefined;
  [RouteConstants.Login]: undefined;
  [RouteConstants.Signup]: undefined;
  [RouteConstants.ProfileForm]: undefined;
  [RouteConstants.ProgressForm]: undefined;
  [RouteConstants.PlanSelection]: undefined;
  [RouteConstants.GoalGuidance]: undefined;
  [RouteConstants.Home]: undefined;
  [RouteConstants.ConnectionError]: undefined;
};
