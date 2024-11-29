import { StyleSheet, View, Platform } from "react-native";
import { useState } from "react";
import { PlanType } from "./types/types";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationProp } from "@react-navigation/native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { LeafIcon } from "../../../components/icons/LeafIcon";
import { WindIcon } from "../../../components/icons/WindIcon";
import { LightningIcon } from "../../../components/icons/LightningIcon";
import { CaloriePlanButton } from "../../../components/buttons/CaloriePlanButton";

const plans = [
  {
    type: "gradual",
    title: "Progresso Gradual",
    icon: LeafIcon,
    duration: 15,
    targetDailyCalories: 1800,
  },
  {
    type: "moderado",
    title: "Progresso Moderado",
    icon: WindIcon,
    duration: 11,
    targetDailyCalories: 1600,
  },
  {
    type: "gradual",
    title: "Progresso Acelerado",
    icon: LightningIcon,
    duration: 7,
    targetDailyCalories: 1360,
  },
];

type PlanSelectionScreenProps = {
  navigation: NavigationProp<any>;
};

const PlanSelectionScreen = (props: PlanSelectionScreenProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  function selectPlan(goal: PlanType) {
    setSelectedPlan(goal === selectedPlan ? null : goal);
  }

  return (
    <ScreenWrapper scrollable>
      <ScreenHeader onGoBack={() => props.navigation.goBack()} />
      <View style={styles.contentContainer}>
        <ScreenTitle
          style={styles.title}
          title="Escolha o plano ideal para você!"
        />
        <Paragraph
          style={styles.text}
          text="Selecione entre 3 opções de planos para alcançar seus objetivos no seu próprio tempo. Seja qual for a sua escolha, estamos prontos para te ajudar a chegar lá!"
        />
        <View style={styles.plansWrapper}>
          {plans.map((plan) => (
            <CaloriePlanButton
              onPress={() => selectPlan(plan.type as any)}
              selected={plan.type === selectedPlan}
              key={plan.type}
              icon={<plan.icon />}
              title={plan.title}
              dailyCalories={plan.targetDailyCalories}
              duration={plan.duration}
            />
          ))}
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
  plansWrapper: {
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
