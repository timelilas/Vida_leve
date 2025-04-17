import { Stack } from "./stack";
import { colors } from "../styles/colors";
import { RouteConstants } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import { ReportRouter } from "./reportRouter/ReportRouter";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import PlanSelectionScreen from "../screens/@shared/PlanSelectionScreen";
import GoalGuidanceScreen from "../screens/onboarding/GoalGuidanceScreen";
import CreateProgressScreen from "../screens/onboarding/CreateProgressScreen";
import CompleteProfileScreen from "../screens/onboarding/CompleteProfileScreen";
import ConnectionErrorScreen from "../screens/error/ConnectionErrorScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import HomeScreen from "../screens/main/HomeScreen";
import GoalSettingsScreen from "../screens/main/GoalSettingsScreen";
import UpdateWeightScreen from "../screens/main/UpdateWeightScreen";
import CreateMealScreen from "../screens/main/CreateMealScreen";
import SearchFoodsScreen from "../screens/main/SearchFoodsScreen";
import MealRegistrationScreen from "../screens/main/MealRegistrationScreen";
import UpdateProfileScreen from "../screens/main/UpdateProfileScreen";

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteConstants.Welcome}
        screenOptions={{
          orientation: "all",
          statusBarStyle: "dark",
          statusBarColor: colors.background.primary
        }}>
        <Stack.Screen
          name={RouteConstants.Welcome}
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.Login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.Signup}
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.CompleteProfile}
          component={CompleteProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.CreateProgress}
          component={CreateProgressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.PlanSelection}
          component={PlanSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.GoalGuidance}
          component={GoalGuidanceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.Home}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.GoalSettings}
          component={GoalSettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.UpdateWeight}
          component={UpdateWeightScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.UpdateProfile}
          component={UpdateProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.CreateMeal}
          component={CreateMealScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.SearchFoods}
          component={SearchFoodsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.MealRegistration}
          component={MealRegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.ConnectionError}
          component={ConnectionErrorScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={RouteConstants.ReportRouter}
          component={ReportRouter}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
