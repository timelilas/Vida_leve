import { PlanType } from "../@core/entities/@shared/planType/type";
import { CaloriePlanProps } from "../@core/entities/caloriePlan/type";
import { ProgressProps } from "../@core/entities/progress/type";

export enum RouteConstants {
  PlanSelection = "SCREEN_Shared_PlanSelection",
  Welcome = "SCREEN_Auth_Welcome",
  Login = "SCREEN_Auth_Login",
  Signup = "SCREEN_Auth_Signup",
  CompleteProfile = "SCREEN_Onboarding_CompleteProfile",
  CreateProgress = "SCREEN_Onboarding_CreateProgress",
  GoalGuidance = "SCREEN_Onboarding_GoalGuidance",
  Home = "SCREEN_Main_Home",
  GoalSettings = "SCREEN_Main_GoalSettings",
  UpdateProgress = "SCREEN_Main_UpdateProgress",
  UpdateProfile = "SCREEN_Main_UpdateProfile",
  CreateMeal = "SCREEN_Main_CreateMeal",
  SearchFoods = "SCREEN_Main_SearchFoods",
  MealRegistration = "SCREEN_Main_MealRegistration",
  Report = "SCREEN_Main_ReportScreen",
  ReportDetails = "SCREEN_Main_ReportDetailsScreen",
  ConnectionError = "SCREEN_Error_ConnectionError",
}

export type RouteParamsList = {
  [RouteConstants.PlanSelection]: {
    nextRoute: string;
    plans: CaloriePlanProps[];
    curentPlan: PlanType | null;
    withModal?: boolean;
    progressData?: Omit<ProgressProps, "currentCaloriePlan">;
  };
  [RouteConstants.Welcome]: undefined;
  [RouteConstants.Login]: undefined;
  [RouteConstants.Signup]: undefined;
  [RouteConstants.CompleteProfile]: undefined;
  [RouteConstants.CreateProgress]: undefined;
  [RouteConstants.GoalGuidance]: undefined;
  [RouteConstants.Home]: undefined;
  [RouteConstants.GoalSettings]: undefined;
  [RouteConstants.UpdateProgress]: undefined;
  [RouteConstants.UpdateProfile]: undefined;
  [RouteConstants.CreateMeal]?: { withSubmitButton?: boolean; date?: string };
  [RouteConstants.SearchFoods]?: { foodName: string };
  [RouteConstants.MealRegistration]: undefined;
  [RouteConstants.Report]: undefined;
  [RouteConstants.ReportDetails]: undefined;
  [RouteConstants.ConnectionError]: undefined;
};
