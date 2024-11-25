import { StyleSheet, View, Platform } from "react-native";
import { useState } from "react";
import { PlanType } from "./types/types";
import { GradualPlanButton } from "../../../components/buttons/planButtons/GradualPlanButton";
import { ModeratedPlanButton } from "../../../components/buttons/planButtons/ModeratedPlanButton";
import { AcceleratedGoalButton } from "../../../components/buttons/planButtons/AcceleratedPlanButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationProp } from "@react-navigation/native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";

type PlanSelectionScreenProps = {
  navigation: NavigationProp<any>;
};

const PlanSelectionScreen = (props: PlanSelectionScreenProps) => {
  const [selectedGoal, setSelectedGoal] = useState<PlanType | null>(null);

  function selectGoal(goal: PlanType) {
    setSelectedGoal(goal === selectedGoal ? null : goal);
  }

  return (
    <ScreenWrapper scrollable>
      <ScreenHeader
        onGoBack={() => props.navigation.goBack()}
        onClose={() => {}}
      />
      <View style={styles.contentContainer}>
        <ScreenTitle
          style={styles.title}
          title="Escolha o plano ideal para você!"
        />
        <Paragraph
          style={styles.text}
          text="Selecione entre 3 opções de planos para alcançar seus objetivos no seu próprio tempo. Seja qual for a sua escolha, estamos prontos para te ajudar a chegar lá!"
        />
        <View style={styles.goalsWrapper}>
          <GradualPlanButton
            selected={selectedGoal === "gradual"}
            onPress={() => selectGoal("gradual")}
          />
          <ModeratedPlanButton
            selected={selectedGoal === "moderado"}
            onPress={() => selectGoal("moderado")}
          />
          <AcceleratedGoalButton
            selected={selectedGoal === "acelerado"}
            onPress={() => selectGoal("acelerado")}
          />
        </View>
      </View>
      <SubmitButton
        onPress={() => props.navigation.navigate("Onboarding/GoalGuidance")}
        title="Salvar informações"
        type="primary"
        style={styles.submitButton}
      />
    </ScreenWrapper>
  );
};

export default PlanSelectionScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
  },
  text: {
    marginTop: 8,
  },
  contentContainer: {
    marginTop: 16,
    marginBottom: 40,
  },
  goalsWrapper: {
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    marginTop: 24,
    paddingBottom: 16,
    gap: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  submitButton: {
    marginTop: "auto",
  },
});
