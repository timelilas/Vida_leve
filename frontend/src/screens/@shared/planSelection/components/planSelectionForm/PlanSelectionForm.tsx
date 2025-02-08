import { StyleSheet, View } from "react-native";
import { CaloriePlanButton } from "./CaloriePlanButton";
import { CaloriePlanProps } from "../../../../../@core/entities/caloriePlan/type";
import { planUiDetails } from "./utils";
import { PlanType } from "../../../../../@core/entities/@shared/planType/type";
import { useForm } from "../../../../../hooks/useForm";
import { SubmitButton } from "../../../../../components/buttons/SubmitButton";
import { useAppNavigation } from "../../../../../hooks/useAppNavigation";

export interface FormState {
  selectedPlan: PlanType;
}

export interface PlanSelectionFormProps {
  currentPlan: PlanType | null;
  plans: CaloriePlanProps[];
  onSubmit: (state: FormState) => Promise<void>;
  onError: (error: Error) => void;
}

export function PlanSelectionForm(props: PlanSelectionFormProps) {
  const { currentPlan, plans, onSubmit, onError } = props;
  const {
    handleChange,
    onSubmit: onFormSubmit,
    data,
  } = useForm<{ planType: PlanType | null }>({
    initialState: { planType: currentPlan },
  });

  useAppNavigation({ preventGoBack: data.isSubmitting });

  function handlePlanSelection(planType: PlanType) {
    if (planType === data.values.planType) {
      handleChange("planType", null);
    } else {
      handleChange("planType", planType);
    }
  }

  async function handleSubmit() {
    const selectedPlan = data.values.planType;

    if (selectedPlan) {
      await onSubmit({ selectedPlan });
    }
  }

  function handleError(error: Error) {
    onError(error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.plansWrapper}>
        {plans.map((plan) => {
          const Icon = planUiDetails[plan.type].icon;
          return (
            <CaloriePlanButton
              disabled={data.isSubmitting}
              onPress={() => handlePlanSelection(plan.type)}
              selected={plan.type === data.values.planType}
              key={plan.type}
              icon={<Icon />}
              title={planUiDetails[plan.type].title}
              dailyCalories={plan.dailyCalorieIntake}
              duration={Math.ceil(plan.durationInDays / 7)}
            />
          );
        })}
      </View>
      <SubmitButton
        disabled={data.isSubmitting || !data.values.planType}
        onPress={onFormSubmit(handleSubmit, handleError)}
        title="Salvar informações"
        type="primary"
        style={styles.submitButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plansWrapper: {
    gap: 16,
    marginBottom: 40,
  },
  submitButton: {
    marginTop: "auto",
  },
});
