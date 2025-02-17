import { Text, TouchableOpacity, View } from "react-native";
import { MugIcon } from "../../../../../components/Icons/MugIcon";
import { AppleIcon } from "../../../../../components/Icons/AppleIcon";
import { FreshFruitsIcon } from "../../../../../components/Icons/FreshFruitsIcon";
import { CookieIcon } from "../../../../../components/Icons/CookieIcon";
import { SoupIcon } from "../../../../../components/Icons/SoupIcon";
import { ProgressBar } from "../../../../../components/ProgressBar/ProgressBar";
import { useProgressStore } from "../../../../../store/progress";
import { useCaloriePlanStore } from "../../../../../store/caloriePlan";
import { useAppNavigation } from "../../../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { styles } from "./styles";

export function ProgressStatistics() {
  const navigation = useAppNavigation();
  const planType = useProgressStore((state) => state.data?.currentCaloriePlan);
  const currentPlan = useCaloriePlanStore((state) =>
    state.data.find(({ type }) => type === planType)
  );

  function navigateToCreateMealScreen() {
    navigation.navigate(RouteConstants.CreateMeal);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foram registradas:</Text>
      <View style={styles.calorieProgress}>
        <View style={styles.foodIconsWrapper}>
          <MugIcon />
          <AppleIcon />
          <FreshFruitsIcon />
          <CookieIcon />
          <SoupIcon />
        </View>
        <ProgressBar
          total={currentPlan?.dailyCalorieIntake || 0}
          achieved={850} //Dado mockado
        />
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCreateMealScreen}>
          <Text style={styles.buttonText}>Registrar refeição</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
