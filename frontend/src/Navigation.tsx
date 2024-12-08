import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthHomeScreen from "./screens/auth/home/AuthHomeScreen";
import LoginScreen from "./screens/auth/login/LoginScreen";
import SignupScreen from "./screens/auth/signup/SignupScreen";
import PlanSelectionScreen from "./screens/onboarding/planSelection/PlanSelectionScreen";
import GoalGuidanceScreen from "./screens/onboarding/goalGuidance/GoalGuidanceScreen";
import HealthFormScreen from "./screens/onboarding/healthForm/HealthFormScreen";
import ProfileFormScreen from "./screens/onboarding/profileForm/ProfileFormScreen";
import ConnectionErrorScreen from "./screens/error/connectionError/ConnectionErrorScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth/Home"
        screenOptions={{
          animation: "simple_push",
          animationDuration: 300,
          orientation: "all",
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
          name="Onboarding/HealthForm"
          component={HealthFormScreen}
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
        <Stack.Screen
          name="ConnectionError"
          component={ConnectionErrorScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
