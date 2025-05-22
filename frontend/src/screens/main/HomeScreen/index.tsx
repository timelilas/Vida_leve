import { View, RefreshControl } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ProileHeader } from "./components/ProfileHeader";
import { PlanInformation } from "./components/PlanInformation";
import { CalorieConsumption } from "./components/CalorieConsumption";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";
import { useProgress } from "../../../hooks/progress/useProgress";
import { useCaloriePlans } from "../../../hooks/caloriePlan/useCaloriePlans";
import { useMeal } from "../../../hooks/meal/useMeal";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { convertDateToLocalDateData } from "../../../utils/helpers";
import { HttpError } from "../../../@core/errors/httpError";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { SectionContainer } from "./components/SectionContainer";
import { StatisticsOverview } from "./components/StatisticsOverview";
import { useWeightHistory } from "../../../hooks/weight/useWeightHistory";

const HomeScreen = () => {
  const { year, month, day } = convertDateToLocalDateData(new Date());
  const { progress } = useProgress({ refetchOnMount: false });
  const { plans } = useCaloriePlans({ refetchOnMount: false });
  const {
    error: weightHistoryError,
    isFetching: isFetchingWeightHistory,
    fetchWeights
  } = useWeightHistory({ limit: 20 });
  const {
    dailyConsumption,
    error: mealsError,
    isFetching: isFetchingMeals,
    fetchMeals
  } = useMeal({ date: new Date(year, month, day) });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const { Snackbar, showSnackbar } = useSnackbar();

  const currentPlan = plans.find(({ type }) => type === progress?.currentCaloriePlan);

  async function refreshData() {
    setIsRefreshing(true);
    await Promise.all([fetchMeals(), fetchWeights()]);
    setIsRefreshing(false);
  }

  const handleQueryError = useCallback(
    (error: Error, target: "meals" | "weightHistory") => {
      const weightHistoryError =
        "Desculpe, não foi possível obter algumas informações do seu perfil. Por favor, tente novamente mais tarde.";
      const calorieConsumptionErrorMessage =
        "Desculpe, não foi possível obter o seu consumo de calorias diário. Por favor, tente novamente mais tarde.";

      const errorMessage =
        error instanceof HttpError
          ? target === "meals"
            ? calorieConsumptionErrorMessage
            : weightHistoryError
          : NETWORK_ERROR_MESSAGE;

      showSnackbar({
        variant: "error",
        duration: 5000,
        message: errorMessage
      });
    },
    [showSnackbar]
  );

  useEffect(() => {
    if (mealsError && !isFetchingMeals) {
      return handleQueryError(mealsError, "meals");
    }
    if (weightHistoryError && !isFetchingWeightHistory) {
      return handleQueryError(weightHistoryError, "weightHistory");
    }
  }, [
    mealsError,
    weightHistoryError,
    isFetchingWeightHistory,
    isFetchingMeals,
    handleQueryError
  ]);

  return (
    <ScreenWrapper
      snackbar={<Snackbar />}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />}>
      <NavigationHeader variant="branded" />
      <View style={styles.body}>
        <ProileHeader />
        <View style={styles.separatorLine} />
        <View style={styles.sectionWrapper}>
          <SectionContainer>
            <PlanInformation />
          </SectionContainer>
          <SectionContainer>
            <CalorieConsumption
              targetCalories={currentPlan?.dailyCalorieIntake || 0}
              consumedCalories={dailyConsumption.total}
              isLoading={isFetchingMeals}
            />
          </SectionContainer>
          <SectionContainer>
            <StatisticsOverview />
          </SectionContainer>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
