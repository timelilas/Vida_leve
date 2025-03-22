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
import { convertDateToLocalDateData } from "../../../utils/helpers";

const HomeScreen = () => {
  const { year, month, day } = convertDateToLocalDateData(new Date());
  const { progress } = useProgress({ refetchOnMount: false });
  const { plans } = useCaloriePlans({ refetchOnMount: false });
  const { Snackbar, showSnackbar } = useSnackbar();

  const currentPlan = plans.find(
    ({ type }) => type === progress?.currentCaloriePlan
  );
  const { dailyConsumption, error, isLoading } = useMeal({
    date: new Date(year, month, day),
  });

  useEffect(() => {
    if (error) {
      showSnackbar({
        variant: "error",
        duration: 7000,
        message:
          "Desculpe, ocorreu um erro ao buscar as informações do seu consumo de calorias diário, por favor, tente novamente mais tarde.",
      });
    }
  }, [error]);

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
            consumedCalories={dailyConsumption.total}
            isLoading={isLoading}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
