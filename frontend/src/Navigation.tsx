import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AuthHomeScreen from "./screens/auth/home/AuthHomeScreen";
import LoginScreen from "./screens/auth/login/LoginScreen";
import SignupScreen from "./screens/auth/signup/SignupScreen";
import PlanSelectionScreen from "./screens/onboarding/planSelection/PlanSelectionScreen";
import GoalGuidanceScreen from "./screens/onboarding/goalGuidance/GoalGuidanceScreen";
import NutritionFromScreen from "./screens/onboarding/nutritionForm/NutritionFormScreen";
import ProfileFormScreen from "./screens/onboarding/profileForm/ProfileFormScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" style="dark" />
      <Stack.Navigator
        initialRouteName="Auth/Home"
        screenOptions={{
          animation: "simple_push",
          animationDuration: 300,
        }}
      >
        <Stack.Screen
          name="Auth/Home"
          component={AuthHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth/Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth/Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding/ProfileForm"
          component={ProfileFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding/NutritionForm"
          component={NutritionFromScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding/PlanSelection"
          component={PlanSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding/GoalGuidance"
          component={GoalGuidanceScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
