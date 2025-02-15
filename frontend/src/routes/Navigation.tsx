import { RouteConstants, RouteParamsList } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import UpdateProgressScreen from "../screens/main/UpdateProgressScreen";
import CreateMealScreen from "../screens/main/CreateMealScreen";
import SearchFoodsScreen from "../screens/main/SearchFoodsScreen";

const Stack = createNativeStackNavigator<RouteParamsList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteConstants.Welcome}
        screenOptions={{
          animation: "simple_push",
          animationDuration: 300,
          orientation: "all",
          statusBarStyle: "dark",
          statusBarColor: "#eff0f6",
        }}
      >
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
          name={RouteConstants.UpdateProgress}
          component={UpdateProgressScreen}
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
          name={RouteConstants.ConnectionError}
          component={ConnectionErrorScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
