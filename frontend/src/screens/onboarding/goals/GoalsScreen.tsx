import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { HorizontalLogoSVG } from "../../../components/HorizontalLogoSVG";
import { ArrowIcon } from "../../../components/icons/ArrowIcon";
import { useState } from "react";
import { GoalType } from "./types/types";
import { GradualGoalButton } from "../../../components/buttons/GoalButtons/GradualGoalButton";
import { ModeratedGoalButton } from "../../../components/buttons/GoalButtons/ModeratedGoalButton";
import { AcceleratedGoalButton } from "../../../components/buttons/GoalButtons/AcceleratedGoalButton";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationProp } from "@react-navigation/native";

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
          <View style={styles.headerContainer}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={4}
              style={styles.goBackButton}
            >
              <ArrowIcon />
            </Pressable>
            <HorizontalLogoSVG />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Estamos quase lá!</Text>
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
          onPress={() => navigation.navigate("Onboarding/GoalGuidance")}
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
    paddingHorizontal: 40,
    paddingBottom: 24,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  headerContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  goBackButton: {
    position: "absolute",
    padding: 2,
    borderRadius: 28 / 2,
    left: 0,
    top: "50%",
    transform: [{ translateY: -28 / 2 }],
  },
  contentContainer: {
    marginTop: 64,
  },
  contentTitle: {
    fontSize: 24,
    fontFamily: "Roboto-700",
    color: "#4e4b66",
    lineHeight: 28.8,
  },
  goalsWrapper: {
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    marginTop: 72,
    paddingBottom: 16,
    gap: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  submitButton: {
    marginTop: 48,
  },
});
