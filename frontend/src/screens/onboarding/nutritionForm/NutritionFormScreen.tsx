import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationProp } from "@react-navigation/native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { Input } from "../../../components/inputs/Input";
import { FrequencyButton } from "./components/FrequencyButton";
import { useState } from "react";
import { PhysicalActivityLevel } from "./types/types";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { useForm } from "../../../hooks/useForm";

type NutritionFormScreenProps = {
  navigation: NavigationProp<any>;
};

const nutritionFromInitialState = {
  height: "",
  weight: "",
  goalWeight: "",
};

const NutritionFormScreen = (props: NutritionFormScreenProps) => {
  const { data, handleChange } = useForm(nutritionFromInitialState);
  const [activityLevel, setActivityLevel] =
    useState<PhysicalActivityLevel | null>(null);

  function selectLevel(level: PhysicalActivityLevel) {
    setActivityLevel(level === activityLevel ? null : level);
  }

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <ScreenHeader navigation={props.navigation} />
        <ScreenTitle title="Nos conte mais sobre você!" style={styles.title} />
        <Paragraph
          text="Precisamos da sua altura, peso atual, meta de peso e frequência de atividade física para personalizar sua jornada."
          style={styles.description}
        />
        <View style={styles.form}>
          <Input
            onChange={(value) => handleChange("height", value)}
            value={data.values.height}
            keyboardType="numeric"
            label="Altura"
            placeholder="Ex.: 1,60"
            name="height"
          />
          <Input
            onChange={(value) => handleChange("weight", value)}
            value={data.values.weight}
            label="Peso atual"
            keyboardType="numeric"
            name="wight"
            placeholder="Ex.: 60 kg"
          />
          <Input
            onChange={(value) => handleChange("goalWeight", value)}
            value={data.values.goalWeight}
            label="Peso desejado"
            keyboardType="numeric"
            name="goal"
            placeholder="Ex.: 55 kg"
          />
          <View style={styles.exerciseLevel}>
            <Paragraph
              style={styles.label}
              text="Qual é o seu nível de atividade física diária?"
            />
            <FrequencyButton
              selected={activityLevel === "pouco"}
              onPress={() => selectLevel("pouco")}
              title="Pouca atividade"
              description="Pouco tempo em pé. p. ex. home office/escritório"
            />
            <FrequencyButton
              selected={activityLevel === "leve"}
              onPress={() => selectLevel("leve")}
              title="Atividade leve"
              description="Quase sempre em pé. p. ex. professor(a)"
            />
            <FrequencyButton
              selected={activityLevel === "moderado"}
              onPress={() => selectLevel("moderado")}
              title="Atividade moderada"
              description="Quase sempre em pé. p. ex. professor(a)/ atendente"
            />
            <FrequencyButton
              selected={activityLevel === "intenso"}
              onPress={() => selectLevel("intenso")}
              title="Atividade intensa"
              description="Fisicamente árduo. p. ex. construção civil"
            />
          </View>
        </View>
        <SubmitButton
          onPress={() => props.navigation.navigate("Onboarding/PlanSelection")}
          style={styles.submitButton}
          type="primary"
          title="Continuar cadastro"
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default NutritionFormScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  title: {
    marginTop: 16,
  },
  description: {
    marginTop: 8,
  },
  label: {
    lineHeight: 16,
  },
  form: {
    gap: 16,
    marginTop: 24,
    marginBottom: 40,
  },
  exerciseLevel: {
    gap: 8,
    paddingBottom: 16,
    overflow: "hidden",
  },
  submitButton: {
    marginTop: "auto",
  },
});
