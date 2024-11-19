import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { Input } from "../../../components/inputs/Input";
import { FrequencyButton } from "./components/FrequencyButton";
import {
  ActitivyFrequency,
  NutritionFormData,
  NutritionFormScreenProps,
} from "./types";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { useForm } from "../../../hooks/useForm";

const nutritionFromInitialState: NutritionFormData = {
  height: "",
  weight: "",
  goalWeight: "",
  activityFrequency: null,
};

const NutritionFormScreen = (props: NutritionFormScreenProps) => {
  const { data, handleChange } = useForm(nutritionFromInitialState);

  function handleActivityFrequencyChange(frequency: ActitivyFrequency) {
    handleChange(
      "activityFrequency",
      data.values.activityFrequency === frequency ? null : frequency
    );
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
              selected={data.values.activityFrequency === "pouca"}
              onPress={() => handleActivityFrequencyChange("pouca")}
              title="Pouca atividade"
              description="Pouco tempo em pé. p. ex. home office/escritório"
            />
            <FrequencyButton
              selected={data.values.activityFrequency === "leve"}
              onPress={() => handleActivityFrequencyChange("leve")}
              title="Atividade leve"
              description="Quase sempre em pé. p. ex. professor(a)"
            />
            <FrequencyButton
              selected={data.values.activityFrequency === "moderada"}
              onPress={() => handleActivityFrequencyChange("moderada")}
              title="Atividade moderada"
              description="Quase sempre em pé. p. ex. professor(a)/ atendente"
            />
            <FrequencyButton
              selected={data.values.activityFrequency === "intensa"}
              onPress={() => handleActivityFrequencyChange("intensa")}
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
