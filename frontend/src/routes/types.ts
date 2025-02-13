import { MealType } from "../@core/entities/@shared/meal/type";
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
  UpdateProgress = "SCREEN_MAIN_UpdateProgress",
  CreateMeal = "SCREEN_MAIN_CreateMeal",
  SearchFoods = "SCREEN_MAIN_SearchFoods",
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
  [RouteConstants.CreateMeal]: undefined;
  [RouteConstants.ConnectionError]: undefined;
  [RouteConstants.SearchFoods]: {
    mealType: MealType;
    mealDate: {
      year: number;
      month: number;
      day: number;
    };
  };
};
