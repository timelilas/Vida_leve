import { Text, View } from "react-native";
import { PlanType } from "../../../../../@core/entities/@shared/planType/type";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { styles } from "./styles";
import { useProgress } from "../../../../../hooks/progress/useProgress";
import { useCaloriePlans } from "../../../../../hooks/caloriePlan/useCaloriePlans";
import { SmallLinkButton } from "../SmallLinkButton";
import { SectionTitle } from "../SectionTitle";

export function PlanInformation() {
  const navigation = useAppNavigation();
  const { progress } = useProgress({ refetchOnMount: false });
  const { plans } = useCaloriePlans({ refetchOnMount: false });
  const currentPlan = plans.find(({ type }) => type === progress?.currentCaloriePlan);

  const planLabelMap: Record<PlanType, string> = {
    gradual: "Progresso gradual",
    moderado: "Progresso moderado",
    acelerado: "Progresso acelerado"
  };

  function navitateToGoalSettings() {
    navigation.navigate(RouteConstants.GoalSettings);
  }

  return (
    <View>
      {progress?.currentCaloriePlan ? (
        <SectionTitle>
          A meta que será executada:{" "}
          <SectionTitle style={styles.titleRegular}>
            {planLabelMap[progress.currentCaloriePlan]}
          </SectionTitle>
        </SectionTitle>
      ) : (
        <SectionTitle>Você não possui um plano de execução cadastrado</SectionTitle>
      )}
      <View style={styles.targetCalorie}>
        <Text style={styles.targetCalorieText}>
          {currentPlan?.dailyCalorieIntake || 0} kcal/dia
        </Text>
      </View>
      <SmallLinkButton
        title="Alterar"
        style={styles.linkButton}
        onPress={navitateToGoalSettings}
      />
    </View>
  );
}
