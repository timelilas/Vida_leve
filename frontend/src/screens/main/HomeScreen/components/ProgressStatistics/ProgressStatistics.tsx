import { Text, TouchableOpacity, View } from "react-native";
import { MugIcon } from "../../../../../components/Icons/MugIcon";
import { AppleIcon } from "../../../../../components/Icons/AppleIcon";
import { FreshFruitsIcon } from "../../../../../components/Icons/FreshFruitsIcon";
import { CookieIcon } from "../../../../../components/Icons/CookieIcon";
import { SoupIcon } from "../../../../../components/Icons/SoupIcon";
import { ProgressBar } from "../../../../../components/ProgressBar/ProgressBar";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { styles } from "./styles";
import { useProgress } from "../../../../../hooks/progress/useProgress";
import { useCaloriePlans } from "../../../../../hooks/caloriePlan/useCaloriePlans";

export function ProgressStatistics() {
  const navigation = useAppNavigation();
  const { progress } = useProgress();
  const { plans } = useCaloriePlans();
  const currentPlan = plans.find(
    ({ type }) => type === progress?.currentCaloriePlan
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
