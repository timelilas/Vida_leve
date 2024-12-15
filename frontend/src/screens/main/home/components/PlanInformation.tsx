import { Platform, StyleSheet, Text, View } from "react-native";
import { PlanType } from "../../../../@core/entities/@shared/plantType";
import { CaloriePlanProps } from "../../../../@core/entities/caloriePlan/caloriePlan";

interface PlanInformation {
  planType?: PlanType;
  dailyCalorie: CaloriePlanProps["dailyCalorieIntake"];
}

export function PlanInformation(props: PlanInformation) {
  const planLabelMap: Record<PlanType, string> = {
    gradual: "Progresso gradual",
    moderado: "Progresso moderado",
    acelerado: "Progresso acelerado",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.planLabel}>
        {props.planType
          ? ` A meta que será executada: ${planLabelMap[props.planType]}`
          : "Você não possui um plano de execução cadastrado"}
      </Text>
      <View style={styles.shadowBox}>
        <Text style={styles.targetCalorie}>{props.dailyCalorie} kcal/dia</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  planLabel: {
    fontSize: 16,
    fontFamily: "Roboto-300",
    color: "#4e4b66",
  },
  targetCalorie: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#f7f7fc",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "##242424",
    textAlign: "center",
    shadowColor: "#000000",
    ...(Platform.OS === "android"
      ? {
          elevation: 4,
        }
      : {
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
          shadowOpacity: 0.4,
        }),
  },
  shadowBox: {
    borderRadius: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    // backgroundColor: "red",
    paddingBottom: 6,
    paddingInline: 2,
  },
});
