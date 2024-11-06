import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationProp } from "@react-navigation/native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { View } from "react-native";
import { Input } from "../../../components/Input";
import { FrequencyButton } from "./components/FrequencyButton";
import { useState } from "react";
import { PhysicalActivityLevel } from "./types/types";
import { SubmitButton } from "../../../components/buttons/SubmitButton";

export default function NutritionFromScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [activityLevel, setActivityLevel] =
    useState<PhysicalActivityLevel | null>(null);

  function selectLevel(level: PhysicalActivityLevel) {
    setActivityLevel(level === activityLevel ? null : level);
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ScreenHeader navigation={navigation} />
        <Text style={styles.title}>Nos conte mais sobre você!</Text>
        <Text style={[styles.text, styles.description]}>
          Precisamos da sua altura, peso atual, meta de peso e frequência de
          atividade física para personalizar sua jornada.
        </Text>
        <View style={styles.inputGroup}>
          <Input
            keyboardType="numeric"
            autoFocus
            placeholder="1,60"
            name="Altura"
            hideLabel
          />
          <Input
            keyboardType="numeric"
            name="Peso"
            placeholder="60 kg"
            hideLabel
          />
          <Input
            keyboardType="numeric"
            name="Meta"
            placeholder="55 kg"
            hideLabel
          />
        </View>
        <View style={styles.exerciseLevel}>
          <Text style={styles.text}>
            Qual é o seu nível de atividade física diária?
          </Text>
          <FrequencyButton
            selected={activityLevel === "sedentary"}
            onPress={() => selectLevel("sedentary")}
            title="Pouca atividade"
            description="Pouco tempo em pé. p. ex. home office/escritório"
          />
          <FrequencyButton
            selected={activityLevel === "light"}
            onPress={() => selectLevel("light")}
            title="Atividade leve"
            description="Quase sempre em pé. p. ex. professor(a)"
          />
          <FrequencyButton
            selected={activityLevel === "moderate"}
            onPress={() => selectLevel("moderate")}
            title="Atividade moderada"
            description="Quase sempre em pé. p. ex. professor(a)/ atendente"
          />
          <FrequencyButton
            selected={activityLevel === "intense"}
            onPress={() => selectLevel("intense")}
            title="Atividade intensa"
            description="Fisicamente árduo. p. ex. construção civil"
          />
        </View>
        <SubmitButton
          onPress={() => navigation.navigate("Onboarding/GoalGuidance")}
          style={styles.submitButton}
          type="primary"
          title="Continuar cadastro"
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  title: {
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: "Roboto-700",
    color: "#4E4B66",
    marginTop: 64,
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-400",
    color: "#4E4B66",
  },
  description: {
    marginTop: 8,
  },
  inputGroup: {
    marginTop: 24,
    gap: 24,
  },
  exerciseLevel: {
    gap: 8,
    marginTop: 100,
    paddingBottom: 32,
    overflow: "hidden",
  },
  submitButton: {
    marginTop: "auto",
  },
});
