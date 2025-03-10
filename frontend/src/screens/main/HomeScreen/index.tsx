import { View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ProileHeader } from "./components/ProfileHeader";
import { PlanInformation } from "./components/PlanInformation";
import { ProgressStatistics } from "./components/ProgressStatistics/ProgressStatistics";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";
import { useProgress } from "../../../hooks/progress/useProgress";
import { useCaloriePlans } from "../../../hooks/caloriePlan/useCaloriePlans";
import { useMeal } from "../../../hooks/meal/useMeal";
import { useEffect } from "react";
import { useSnackbar } from "../../../hooks/common/useSnackbar";

const HomeScreen = () => {
  const { progress } = useProgress({ refetchOnMount: false });
  const { plans } = useCaloriePlans({ refetchOnMount: false });
  const { Snackbar, showSnackbar } = useSnackbar();

  const currentPlan = plans.find(
    ({ type }) => type === progress?.currentCaloriePlan
  );
  const { dailyCalorieConsumption } = useMeal({
    calorieConsumption: { date: new Date() },
  });

  useEffect(() => {
    if (dailyCalorieConsumption.error) {
      showSnackbar({
        variant: "error",
        duration: 7000,
        message:
          "Desculpe, ocorreu um erro ao buscar as informações do seu consumo de calorias diário, por favor, tente novamente mais tarde.",
      });
    }
  }, [dailyCalorieConsumption.error]);

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" />
      <View style={styles.body}>
        <ProileHeader />
        <View style={styles.separatorLine} />
        <View style={styles.progressContainer}>
          <PlanInformation />
          <ProgressStatistics
            targetCalories={currentPlan?.dailyCalorieIntake || 0}
            consumedCalories={dailyCalorieConsumption.data.total}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
