import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { Input } from "../../../components/inputs/Input";
import { ActivityFrequencyButton } from "./components/ActivityFrequencyButton";
import { ProgressFormData } from "./types";
import { ActitivyFrequency } from "../../../@core/entities/@shared/activityFrequency";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { useForm } from "../../../hooks/useForm";
import { httpAuthService } from "../../../services/auth";
import { validateHeight } from "../../../utils/validations/height";
import { validateWeight } from "../../../utils/validations/weight";
import { validateActitivyFrequency } from "../../../utils/validations/activityFrequency";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { activityFrequencies, missingProfileFormField } from "./utils";
import { validateGoalWeight } from "../../../utils/validations/goalWeight";
import { useUserStore } from "../../../store/user";
import { useProgressStore } from "../../../store/progress";
import { calculateAge } from "../../../@core/entities/user/helpers";
import { useRef } from "react";
import { HttpError } from "../../../@core/errors/httpError";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { buildCaloriePlan } from "../../../@core/entities/caloriePlan/helpers";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  maskHeight,
  heightToString,
  onlyNumbers,
  parseHeight,
} from "../../../utils/masks";

const ProgressFormScreen = () => {
  const setProgress = useProgressStore((state) => state.setProgress);
  const setPlans = useCaloriePlanStore((state) => state.setPlans);
  const navigation = useNavigation<NavigationProp<any>>();
  const scrollRef = useRef<ScrollView>(null);
  const progress = useProgressStore((state) => state.data);
  const gender = useUserStore((state) => state.data.gender);
  const birthDate = useUserStore((state) => state.data.birthDate);

  const { data, handleChange, setError, validateField, onSubmit } =
    useForm<ProgressFormData>({
      initialState: {
        height: progress?.height ? heightToString(progress?.height) : "",
        weight: progress?.weight ?? 0,
        goalWeight: progress?.goalWeight ?? 0,
        activityFrequency: progress?.activityFrequency ?? null,
      },
    });
  const { values, error, isSubmitting } = data;
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

  function generateCaloriePlans() {
    if (!birthDate || !gender || !activityFrequency) {
      return [];
    }

    const age = calculateAge(new Date(birthDate as string));
    const userData = { weight, height: parseHeight(height), gender, age };
    const goalData = { dailyActivityLevel: activityFrequency, goalWeight };
    const planTypes = ["gradual", "moderado", "acelerado"] as const;
    const planList = planTypes.map((plan) =>
      buildCaloriePlan({ ...userData, ...goalData, planType: plan })
    );

    return planList;
  }

  function handleGoalWeightValidation() {
    if (!birthDate || !gender) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return setError({ message: missingProfileFormField });
    }
    const { success: validWeight } = validateWeight(weight);
    const { success: validHeight } = validateHeight(parseHeight(height));

    if (validWeight && validHeight) {
      validateField("goalWeight", goalWeight, (goalWeight: number) =>
        validateGoalWeight({
          gender,
          age: calculateAge(new Date(birthDate)),
          height: parseHeight(height),
          weight,
          goalWeight,
        })
      );
    }
  }

  function validateAllFields() {
    if (!birthDate || !gender) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return setError({ message: missingProfileFormField });
    }
    const age = calculateAge(new Date(birthDate));
    const heightAsNumber = parseHeight(height);
    const goalWeightParams = {
      height: heightAsNumber,
      weight,
      gender,
      goalWeight,
      age,
    };

    const validationMap = {
      height: validateHeight(heightAsNumber),
      weight: validateWeight(weight),
      goalWeight: validateGoalWeight(goalWeightParams),
      activityFrequency: validateActitivyFrequency(activityFrequency || ""),
    };

    for (const [field, validation] of Object.entries(validationMap)) {
      if (!validation.success) {
        setError({ field: field as any, message: validation.error });
        return false;
      }
    }
    return true;
  }

  async function handleSubmit() {
    if (!validateAllFields()) return;

    const { data } = await httpAuthService.createProgress({
      weight,
      goalWeight,
      height: parseHeight(height),
      activityFrequency: activityFrequency as ActitivyFrequency,
    });

    const plans = generateCaloriePlans();

    setProgress(data);
    setPlans(plans);
    navigation.navigate("Onboarding/PlanSelection");
  }

  function handleError(error: Error) {
    if (error instanceof HttpError) {
      !error.field && scrollRef.current?.scrollTo({ y: 0, animated: true });
      return setError({ field: error.field as any, message: error.message });
    }
    if (error instanceof ConnectionError) {
      return navigation.navigate("ConnectionError");
    }
    setError({ message: UNEXPECTED_ERROR_MESSAGE });
  }

  function goBack() {
    navigation.goBack();
  }

  return (
    <ScreenWrapper ref={scrollRef} scrollable>
      <ScreenHeader style={styles.header} onGoBack={goBack} />
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
          onChange={(value) => handleChange("height", maskHeight(value))}
          onBlur={() =>
            validateField("height", parseHeight(height), validateHeight)
          }
          disabled={isSubmitting}
          error={error.field === "height"}
          value={`${height}`}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
            <ActivityFrequencyButton
              key={type}
              disabled={isSubmitting}
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
        disabled={isSubmitting}
        onPress={onSubmit(handleSubmit, handleError)}
        style={styles.submitButton}
        type="primary"
        title="Continuar cadastro"
      />
    </ScreenWrapper>
  );
};

export default ProgressFormScreen;

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
