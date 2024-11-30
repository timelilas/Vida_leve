import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { Input } from "../../../components/inputs/Input";
import { FrequencyButton } from "./components/FrequencyButton";
import { HealthFormData, HealthFormScreenProps } from "./types";
import { ActitivyFrequency } from "../../../@core/progress/progress";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { useForm } from "../../../hooks/useForm";
import { httpAuthService } from "../../../services/auth";
import { maskHeight, onlyNumbers } from "../../../utils/masks";
import { validateHeight } from "../../../utils/validations/height";
import { validateWeight } from "../../../utils/validations/weight";
import { validateActitivyFrequency } from "../../../utils/validations/activityFrequency";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { activityFrequencies } from "./constants";
import { validateGoalWeight } from "../../../utils/validations/goalWeight";
import { useRef } from "react";

const healthFormInitialState: HealthFormData = {
  height: NaN,
  weight: 0,
  goalWeight: 0,
  activityFrequency: null,
};

const HealthFormScreen = (props: HealthFormScreenProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const { data, handleChange, setError, validateField } = useForm(
    healthFormInitialState
  );
  const { values, error } = data;
  const { height, weight, goalWeight, activityFrequency } = values;

  function selectActitivyFrequency(frequency: ActitivyFrequency) {
    const newFrequency = activityFrequency === frequency ? null : frequency;
    handleChange("activityFrequency", newFrequency);
    validateField(
      "activityFrequency",
      newFrequency || "",
      validateActitivyFrequency
    );
  }

  function handleGoalWeightValidation() {
    const { success: validWeight } = validateWeight(weight);
    const { success: validHeight } = validateHeight(height);

    if (validWeight && validHeight) {
      validateField("goalWeight", goalWeight, (goalWeight: number) =>
        validateGoalWeight({
          gender: "masculino",
          age: 25,
          height,
          goalWeight,
        })
      );
    }
  }

  async function submitNutritionForm() {
    const result = await httpAuthService.createProgress(data as any);

    console.log("Result: ", result);

    if (!result.success) {
      const field = result.error.field || undefined;

      console.log("ERROR: ", result.error);

      setError({ message: result.error.message, field: field as any });
    } else {
      props.navigation.navigate("Onboarding/PlanSelection");
    }
  }

  return (
    <ScreenWrapper ref={scrollRef} scrollable>
      <ScreenHeader
        style={styles.header}
        onGoBack={() => props.navigation.goBack()}
      />
      {!error.field && error.message && (
        <ErrorMessage style={styles.error} message={error.message} />
      )}
      <ScreenTitle title="Nos conte mais sobre você!" />
      <Paragraph
        text="Precisamos da sua altura, peso atual, meta de peso e frequência de atividade física para personalizar sua jornada."
        style={styles.description}
      />
      <View style={styles.form}>
        <Input
          onChange={(value) =>
            handleChange("height", parseFloat(maskHeight(value)))
          }
          onBlur={() => validateField("height", height, validateHeight)}
          error={error.field === "height"}
          value={!isNaN(height) ? `${height}`.replace(".", ",") : ""}
          errorMessage={error.field === "height" ? error.message : undefined}
          keyboardType="numeric"
          label="Altura"
          placeholder="Ex.: 1,60"
          name="height"
          autoFocus
        />
        <Input
          onChange={(value) =>
            handleChange("weight", parseInt(onlyNumbers(value, 3)))
          }
          error={error.field === "weight"}
          onBlur={() => validateField("weight", weight, validateWeight)}
          value={weight ? `${weight}`.concat(" kg") : ""}
          selection={{ start: `${weight}`.length, end: `${weight}`.length }}
          errorMessage={error.field === "weight" ? error.message : undefined}
          label="Peso atual"
          keyboardType="numeric"
          name="wight"
          placeholder="Ex.: 60 kg"
        />
        <Input
          onChange={(value) =>
            handleChange("goalWeight", parseInt(onlyNumbers(value, 3)))
          }
          onBlur={handleGoalWeightValidation}
          error={error.field === "goalWeight"}
          value={goalWeight ? `${goalWeight}`.concat(" kg") : ""}
          selection={{
            start: `${goalWeight}`.length,
            end: `${goalWeight}`.length,
          }}
          errorMessage={
            error.field === "goalWeight" ? error.message : undefined
          }
          label="Peso desejado"
          keyboardType="numeric"
          name="goal"
          placeholder="Ex.: 55 kg"
        />
        <View style={styles.wrapper}>
          <Paragraph
            style={styles.label}
            text="Qual é o seu nível de atividade física diária?"
          />
          {activityFrequencies.map(({ type, title, description }) => (
            <FrequencyButton
              key={type}
              selected={activityFrequency === type}
              onPress={() => selectActitivyFrequency(type)}
              title={title}
              description={description}
            />
          ))}
          {error.field === "activityFrequency" && error.message && (
            <ErrorMessage message={error.message} />
          )}
        </View>
      </View>
      <SubmitButton
        onPress={submitNutritionForm}
        style={styles.submitButton}
        type="primary"
        title="Continuar cadastro"
      />
    </ScreenWrapper>
  );
};

export default HealthFormScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  error: {
    marginBottom: 8,
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
  wrapper: {
    gap: 8,
    paddingBottom: 16,
    overflow: "hidden",
  },
  submitButton: {
    marginTop: "auto",
  },
});

// const HealthFormScreen = (props: HealthFormScreenProps) => {
//   const scrollRef = useRef<ScrollView>(null);
//   const progress = useProgressStore((state) => state.data);
//   const birthDate = useUserStore((state) => state.data.birthDate);
//   const setProgress = useProgressStore((state) => state.setProgress);
//   const { data, handleChange, setError, validateField } =
//     useForm<HealthFormData>({
//       height: Number(progress?.height),
//       weight: progress?.weight ?? 0,
//       goalWeight: progress?.height ?? 0,
//       activityFrequency: progress?.activityFrequency ?? null,
//     });

//   const { values, error } = data;
//   const { height, weight, goalWeight, activityFrequency } = values;

//   async function submitNutritionForm() {
//     props.navigation.navigate("Onboarding/PlanSelection");
//     setProgress(data.values as any);
//     // const result = await httpAuthService.createProgress(data as any);

//     // console.log("Result: ", result);

//     // if (!result.success) {
//     //   const field = result.error.field || undefined;

//     //   console.log("ERROR: ", result.error);

//     //   setError({ message: result.error.message, field: field as any });
//     // } else {
//     //   props.navigation.navigate("Onboarding/PlanSelection");
//     // }
//   }

//   return;
// };
