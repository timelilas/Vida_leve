import { View } from "react-native";
import { Input } from "../Input";
import { WeightInput } from "./WeightInput";
import { ActivityFrequencySelection } from "./ActivityFrequencySelection";
import { styles } from "./styles";
import { maskHeight, onlyNumbers } from "../../utils/masks";
import { SubmitButton } from "../SubmitButton";
import { ActitivyFrequency } from "../../@core/entities/@shared/activityFrequency/type";
import { calculateAge } from "../../@core/entities/user/helpers";
import { OnProgressSubmitData, ProgressFormData } from "./types";
import { ProgressProps } from "../../@core/entities/progress/type";
import { HttpError } from "../../@core/errors/httpError";
import { buildCaloriePlan } from "../../@core/entities/caloriePlan/helpers";
import { validPlanTypes } from "../../@core/entities/@shared/planType/constants";
import { Controller, useForm } from "react-hook-form";
import { zodProgressSchema } from "./schema";
import { customZodResolver } from "../../libs/zod/@shared/resolver";

interface ProgressFormProps {
  variant: "default" | "goalAdjustments";
  initialData: ProgressFormData;
  submitButtonText: string;
  onSubmit: (formData: OnProgressSubmitData) => Promise<void>;
  onError?: (error: Error) => void;
  disabled?: boolean;
}

export function ProgressForm(props: ProgressFormProps) {
  const { initialData, variant, submitButtonText } = props;
  const { birthDate, ...rest } = initialData;
  const initialFormData = { ...rest, age: calculateAge(new Date(birthDate)) };

  const {
    control,
    trigger,
    setError,
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    criteriaMode: "firstError",
    values: initialFormData,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: customZodResolver(zodProgressSchema)
  });

  const firstFieldError = Object.entries(errors)[0];

  function selectActitivyFrequency(value: ActitivyFrequency) {
    const currentActivityFrequency = getValues("activityFrequency");
    setValue("activityFrequency", currentActivityFrequency === value ? null : value);
    trigger();
  }

  function revalidateAllFields() {
    trigger();
  }

  function generateCaloriePlans(
    params: Omit<ProgressProps, "currentCaloriePlan" | "lastWeightUpdateAt">
  ) {
    const { weight, height, goalWeight, activityFrequency } = params;
    if (!initialData.birthDate || !initialData.gender) {
      return [];
    }

    const age = calculateAge(new Date(birthDate));
    const userData = { weight, height, age, gender: initialData.gender };
    const goalData = { dailyActivityLevel: activityFrequency, goalWeight };
    const planList = validPlanTypes.map((plan) =>
      buildCaloriePlan({ ...userData, ...goalData, planType: plan })
    );

    return planList;
  }

  function handleApiError(error: Error) {
    if (error instanceof HttpError && error.field) {
      setError(error.field as any, { message: error.message });
    }
    if (props.onError) {
      props.onError(error);
    }
  }

  async function onSubmit(params: Omit<ProgressFormData, "birthDate"> & { age: number }) {
    const sanitizedData = {
      height: parseFloat(params.height),
      weight: parseInt(params.weight),
      goalWeight: parseInt(params.goalWeight),
      activityFrequency: params.activityFrequency as ActitivyFrequency
    };
    try {
      const newCaloriePlans = generateCaloriePlans(sanitizedData);
      await props.onSubmit({ formData: sanitizedData, newCaloriePlans });
    } catch (error: any) {
      handleApiError(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          {variant === "default" && (
            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, value, name } }) => {
                const isHeightError = firstFieldError?.at(0) === name;
                return (
                  <Input
                    onChangeText={(text) => onChange(maskHeight(text))}
                    onBlur={revalidateAllFields}
                    disabled={isSubmitting}
                    error={isHeightError}
                    value={value.replace(/\./, ",")}
                    keyboardType="numeric"
                    label="Altura"
                    placeholder="Ex.: 1,60"
                    errorMessage={isHeightError ? firstFieldError[1].message : undefined}
                  />
                );
              }}
            />
          )}
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value, name } }) => {
              const isWeightError = firstFieldError?.at(0) === name;
              return (
                <WeightInput
                  label="Peso atual"
                  value={value}
                  disabled={isSubmitting}
                  placeholder="Ex.: 60 kg"
                  onBlur={revalidateAllFields}
                  onChangeText={(text) => onChange(onlyNumbers(text, 3))}
                  error={isWeightError}
                  errorMessage={isWeightError ? firstFieldError[1].message : undefined}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="goalWeight"
            render={({ field: { onChange, value, name } }) => {
              const isGoalWeightError = firstFieldError?.at(0) === name;
              return (
                <WeightInput
                  label="Peso desejado"
                  value={value}
                  disabled={isSubmitting}
                  placeholder="Ex.: 55 kg"
                  onBlur={revalidateAllFields}
                  onChangeText={(text) => onChange(onlyNumbers(text, 3))}
                  error={isGoalWeightError}
                  errorMessage={isGoalWeightError ? firstFieldError[1].message : undefined}
                />
              );
            }}
          />
        </View>
        <Controller
          control={control}
          name="activityFrequency"
          render={({ field: { value, name } }) => {
            const isActivityFrequnecyError = firstFieldError?.at(0) === name;
            return (
              <ActivityFrequencySelection
                style={styles.planSelection}
                onSelect={selectActitivyFrequency}
                selectedFrequency={value}
                disabled={isSubmitting}
                errorMessage={
                  isActivityFrequnecyError ? firstFieldError[1].message : undefined
                }
              />
            );
          }}
        />
      </View>
      <SubmitButton
        disabled={isSubmitting || props.disabled}
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
        type="primary"
        title={submitButtonText}
      />
    </View>
  );
}
