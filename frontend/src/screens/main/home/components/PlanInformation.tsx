import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PlanType } from "../../../../@core/entities/@shared/planType/type";
import { useProgressStore } from "../../../../store/progress";
import { useCaloriePlanStore } from "../../../../store/caloriePlan";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../../routes/types";

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

const styles = StyleSheet.create({
  titleThin: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-300",
    color: "#4e4b66",
    marginBottom: 8,
  },
  titleRegular: {
    fontFamily: "Roboto-400",
  },
  targetCalorie: {
    borderRadius: 8,
    height: 48,
    borderWidth: 3,
    borderColor: "#ffae31",
    justifyContent: "center",
    backgroundColor: "#f7f7fc",
    shadowColor: "#000000",
    ...(Platform.OS === "android"
      ? {
          elevation: 2,
        }
      : {
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
          shadowOpacity: 0.25,
        }),
  },
  targetCalorieText: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "##242424",
    textAlign: "center",
  },
  adjustGoalButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  adjustGoalText: {
    textAlign: "auto",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto-300",
    color: "#0000FF",
  },
});
