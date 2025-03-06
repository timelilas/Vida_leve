import { Text, TouchableOpacity, View } from "react-native";
import { PlanType } from "../../../../../@core/entities/@shared/planType/type";
import { useProgressStore } from "../../../../../store/progress";
import { useCaloriePlanStore } from "../../../../../store/caloriePlan";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { styles } from "./styles";

export function PlanInformation() {
  const navigation = useAppNavigation();
  const planType = useProgressStore((state) => state.data?.currentCaloriePlan);
  const currentPlan = useCaloriePlanStore((state) =>
    state.data.find(({ type }) => type === planType)
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
      {planType ? (
        <Text style={styles.titleThin}>
          A meta que será executada:{" "}
          <Text style={styles.titleRegular}>{planLabelMap[planType]}</Text>
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
