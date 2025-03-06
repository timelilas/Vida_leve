import { Text, TouchableOpacity, View } from "react-native";
import { PlanType } from "../../../../../@core/entities/@shared/planType/type";
import { useCaloriePlanStore } from "../../../../../store/caloriePlan";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { styles } from "./styles";
import { useProgress } from "../../../../../hooks/progress/useProgress";

export function PlanInformation() {
  const navigation = useAppNavigation();
  const { progress } = useProgress();
  const currentPlan = useCaloriePlanStore((state) =>
    state.data.find(({ type }) => type === progress?.currentCaloriePlan)
  );

  const planLabelMap: Record<PlanType, string> = {
    gradual: "Progresso gradual",
    moderado: "Progresso moderado",
    acelerado: "Progresso acelerado",
  };

  function navitateToGoalSettings() {
    navigation.navigate(RouteConstants.GoalSettings);
  }

  return (
    <View>
      {progress?.currentCaloriePlan ? (
        <Text style={styles.titleThin}>
          A meta que será executada:{" "}
          <Text style={styles.titleRegular}>
            {planLabelMap[progress.currentCaloriePlan]}
          </Text>
        </Text>
      ) : (
        <Text style={styles.titleThin}>
          Você não possui um plano de execução cadastrado
        </Text>
      )}
      <View style={styles.targetCalorie}>
        <Text style={styles.targetCalorieText}>
          {currentPlan?.dailyCalorieIntake || 0} kcal/dia
        </Text>
      </View>
      <TouchableOpacity
        onPress={navitateToGoalSettings}
        style={styles.adjustGoalButton}
      >
        <Text style={styles.adjustGoalText}>Alterar</Text>
      </TouchableOpacity>
    </View>
  );
}
