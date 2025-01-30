import { View } from "react-native";
import { Input } from "../inputs/Input";
import { WeightInput } from "../inputs/WeightInput";
import { ActivityFrequencySelection } from "../acitivityFrequencySelection/ActivityFrequencySelection";
import { styles } from "./styles";
import { maskHeight, onlyNumbers, parseHeight } from "../../utils/masks";
import { SubmitButton } from "../buttons/SubmitButton";
import { useForm } from "../../hooks/useForm";
import { validateActitivyFrequency } from "../../utils/validations/activityFrequency";
import { ActitivyFrequency } from "../../@core/entities/@shared/activityFrequency/type";
import { validateGoalWeight } from "../../utils/validations/goalWeight";
import { calculateAge } from "../../@core/entities/user/helpers";
import { validateWeight } from "../../utils/validations/weight";
import { validateHeight } from "../../utils/validations/height";
import {
  OnProgressSubmitData,
  ProgressFormInitialData,
  ProgressFormValidationResult,
} from "./types";
import { ProgressProps } from "../../@core/entities/progress/type";
import { HttpError } from "../../@core/errors/httpError";
import { buildCaloriePlan } from "../../@core/entities/caloriePlan/helpers";
import { validPlanTypes } from "../../@core/entities/@shared/planType/constants";

interface ProgressFormProps {
  variant: "default" | "goalAdjustments";
  initialData: ProgressFormInitialData;
  onError: (error: Error) => void;
  onSubmit: (formData: OnProgressSubmitData) => Promise<void>;
}

export function ProgressForm(props: ProgressFormProps) {
  const { initialData, variant } = props;
  const { birthDate, gender, ...formDataRest } = initialData;

  const { data, handleChange, setError, validateField, onSubmit } = useForm<
    Omit<ProgressFormInitialData, "birthDate" | "gender">
  >({ initialState: formDataRest });

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

  function handleGoalWeightValidation() {
    if (!birthDate || !gender) return;

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

  function validateAllFields(): ProgressFormValidationResult<
    Omit<ProgressProps, "currentCaloriePlan">
  > {
    if (!birthDate || !gender) return { success: false };

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
        return { success: false };
      }
    }
    return {
      success: true,
      data: {
        weight,
        goalWeight,
        height: parseHeight(height),
        activityFrequency: activityFrequency as ActitivyFrequency,
      },
    };
  }

  function generateCaloriePlans(
    params: Omit<ProgressProps, "currentCaloriePlan">
  ) {
    const { weight, height, goalWeight, activityFrequency } = params;
    if (!birthDate || !gender) {
      return [];
    }

    const age = calculateAge(new Date(birthDate as string));
    const userData = { weight, height, gender, age };
    const goalData = { dailyActivityLevel: activityFrequency, goalWeight };
    const planList = validPlanTypes.map((plan) =>
      buildCaloriePlan({ ...userData, ...goalData, planType: plan })
    );

    return planList;
  }

  async function handleSubmit() {
    const validationResult = validateAllFields();
    if (!validationResult.success) {
      return;
    }
    const formData = validationResult.data;
    const newCaloriePlans = generateCaloriePlans(formData);
    await props.onSubmit({ formData, newCaloriePlans });
  }

  function handleError(error: Error) {
    if (error instanceof HttpError) {
      setError({ field: error.field as any, message: error.message });
    }
    props.onError(error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          {variant === "default" && (
            <Input
              onChangeText={(value) =>
                handleChange("height", maskHeight(value))
              }
              onBlur={() =>
                validateField("height", parseHeight(height), validateHeight)
              }
              disabled={isSubmitting}
              error={error.field === "height"}
              value={`${height}`}
              errorMessage={
                error.field === "height" ? error.message : undefined
              }
              keyboardType="numeric"
              label="Altura"
              placeholder="Ex.: 1,60"
              autoFocus
            />
          )}
          <WeightInput
            label="Peso atual"
            value={`${weight || ""}`}
            disabled={isSubmitting}
            placeholder="Ex.: 60 kg"
            error={error.field === "weight"}
            errorMessage={error.field === "weight" ? error.message : undefined}
            onBlur={() => validateField("weight", weight, validateWeight)}
            onChangeText={(value) =>
              handleChange("weight", parseInt(onlyNumbers(value, 3)))
            }
          />
          <WeightInput
            label="Peso desejado"
            value={`${goalWeight || ""}`}
            disabled={isSubmitting}
            placeholder="Ex.: 55 kg"
            error={error.field === "goalWeight"}
            errorMessage={
              error.field === "goalWeight" ? error.message : undefined
            }
            onBlur={handleGoalWeightValidation}
            onChangeText={(value) =>
              handleChange("goalWeight", parseInt(onlyNumbers(value, 3)))
            }
          />
        </View>
        <ActivityFrequencySelection
          style={styles.planSelection}
          onSelect={selectActitivyFrequency}
          selectedFrequency={activityFrequency}
          disabled={isSubmitting}
          errorMessage={
            error.field === "activityFrequency" ? error.message : undefined
          }
        />
      </View>
      <SubmitButton
        disabled={isSubmitting}
        onPress={onSubmit(handleSubmit, handleError)}
        style={styles.submitButton}
        type="primary"
        title="Continuar cadastro"
      />
    </View>
  );
}
