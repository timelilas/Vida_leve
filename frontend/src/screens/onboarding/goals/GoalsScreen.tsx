import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { GoalType } from "./types/types";
import { GradualGoalButton } from "../../../components/buttons/GoalButtons/GradualGoalButton";
import { ModeratedGoalButton } from "../../../components/buttons/GoalButtons/ModeratedGoalButton";
import { AcceleratedGoalButton } from "../../../components/buttons/GoalButtons/AcceleratedGoalButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationProp } from "@react-navigation/native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";

export default function GoalsScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null);

  function selectGoal(goal: GoalType) {
    setSelectedGoal(goal === selectedGoal ? null : goal);
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <ScreenHeader
            navigation={navigation}
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
              <GradualGoalButton
                selected={selectedGoal === "gradual"}
                onPress={() => selectGoal("gradual")}
              />
              <ModeratedGoalButton
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
          onPress={() => navigation.navigate("Onboarding/NutritionForm")}
          title="Salvar informações"
          type="primary"
          style={styles.submitButton}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

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
