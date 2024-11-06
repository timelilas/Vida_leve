import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import GoalsScreen from "./screens/onboarding/goals/GoalsScreen";
import GoalGuidanceScreen from "./screens/onboarding/goalGuidance/GoalGuidanceScreen";
import NutritionFromScreen from "./screens/onboarding/nutritionForm/NutritionFormScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#EFF0F6" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding/Goals"
          component={GoalsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding/GoalGuidance"
          component={GoalGuidanceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding/NutritionForm"
          component={NutritionFromScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
