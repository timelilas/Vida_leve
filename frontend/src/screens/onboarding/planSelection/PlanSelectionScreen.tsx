import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
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
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View>
          <ScreenHeader
            navigation={props.navigation}
            style={styles.headerContainer}
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
        </View>
        <SubmitButton
          onPress={() => props.navigation.navigate("Onboarding/GoalGuidance")}
          title="Salvar informações"
          type="primary"
          style={styles.submitButton}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PlanSelectionScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "space-between",
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  headerContainer: {
    marginTop: 24,
  },
  title: {
    textAlign: "left",
  },
  text: {
    marginTop: 8,
  },
  contentContainer: {
    marginTop: 16,
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
    marginTop: 40,
  },
});
