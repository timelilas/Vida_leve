import { Text, View } from "react-native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { ToggleButton } from "../../../components/ToggleButton";
import { useState } from "react";
import { RouteConstants } from "../../../routes/types";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
import { styles } from "./styles";
import { useProgress } from "../../../hooks/progress/useProgress";

type SelectedRoute = "progress" | "plan";

const GoalSettingsScreen = () => {
  const navigation = useAppNavigation();
  const caloriePlans = useCaloriePlanStore((state) => state.data);
  const { progress } = useProgress();
  const [selectedRoute, setSelectedRoute] = useState<SelectedRoute | null>(
    null
  );

  function goBack() {
    navigation.goBack();
  }

  function selectRoute(route: SelectedRoute | null) {
    setSelectedRoute(route);
  }

  function navigateToPlanSelection() {
    navigation.navigate(RouteConstants.PlanSelection, {
      nextRoute: RouteConstants.Home,
      withModal: true,
      plans: caloriePlans,
      curentPlan: progress?.currentCaloriePlan || null,
    });
  }

  function navigateToUpdateProgress() {
    navigation.navigate(RouteConstants.UpdateProgress);
  }

  return (
    <ScreenWrapper scrollEnabled={selectedRoute === null}>
      <View style={styles.body}>
        <NavigationHeader variant="branded" onBack={goBack} />
        <View style={styles.contentContainer}>
          <ScreenTitle title="Altere sua meta diária" />
          <Paragraph>
            Ajuste facilmente sua meta de calorias e refeições para alcançar
            seus objetivos de forma personalizada. Através da:
          </Paragraph>
        </View>
        <View style={styles.buttonWrapper}>
          <ToggleButton
            rounded
            onPress={navigateToUpdateProgress}
            selected={selectedRoute === "progress"}
            onTouchStart={() => selectRoute("progress")}
            onTouchEnd={() => selectRoute(null)}
          >
            <Text style={styles.buttonText}>Meta</Text>
          </ToggleButton>
          <Text style={styles.textDivider}>Ou</Text>
          <ToggleButton
            rounded
            onPress={navigateToPlanSelection}
            selected={selectedRoute === "plan"}
            onTouchStart={() => selectRoute("plan")}
            onTouchEnd={() => selectRoute(null)}
          >
            <Text style={styles.buttonText}>Plano de execução</Text>
          </ToggleButton>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default GoalSettingsScreen;
