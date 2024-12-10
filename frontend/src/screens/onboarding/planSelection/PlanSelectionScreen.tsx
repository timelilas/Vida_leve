import { StyleSheet, View, Platform } from "react-native";
import { useState } from "react";
import { PlanType } from "./types";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationProp } from "@react-navigation/native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { CaloriePlanButton } from "../../../components/buttons/CaloriePlanButton";
import { caloriePlans } from "./utils";

type PlanSelectionScreenProps = {
  navigation: NavigationProp<any>;
};

const PlanSelectionScreen = (props: PlanSelectionScreenProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  function selectPlan(plan: PlanType) {
    setSelectedPlan(plan === selectedPlan ? null : plan);
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
          {caloriePlans.map((plan) => (
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
