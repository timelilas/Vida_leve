import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/login/LoginScreen";
import SignupScreen from "../screens/auth/signup/SignupScreen";
import PlanSelectionScreen from "../screens/onboarding/planSelection/PlanSelectionScreen";
import GoalGuidanceScreen from "../screens/onboarding/goalGuidance/GoalGuidanceScreen";
import ProgressFormScreen from "../screens/onboarding/progressForm/ProgressFormScreen";
import ProfileFormScreen from "../screens/onboarding/profileForm/ProfileFormScreen";
import ConnectionErrorScreen from "../screens/error/connectionError/ConnectionErrorScreen";
import WelcomeScreen from "../screens/auth/welcome/WelcomeScreen";
import HomeScreen from "../screens/main/home/HomeScreen";
import { RouteConstants } from "./types";

const Stack = createNativeStackNavigator();

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
          name={RouteConstants.ProfileForm}
          component={ProfileFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteConstants.ProgressForm}
          component={ProgressFormScreen}
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
          name={RouteConstants.ConnectionError}
          component={ConnectionErrorScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;