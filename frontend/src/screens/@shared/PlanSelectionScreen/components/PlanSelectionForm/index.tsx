import { StyleSheet, View } from "react-native";
import { CaloriePlanButton } from "../CaloriePlanButton";
import { CaloriePlanProps } from "../../../../../@core/entities/caloriePlan/type";
import { planUiDetails } from "./utils";
import { PlanType } from "../../../../../@core/entities/@shared/planType/type";
import { SubmitButton } from "../../../../../components/SubmitButton";
import { useAppNavigation } from "../../../../../hooks/useAppNavigation";
import { useState } from "react";

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
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(
    currentPlan
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useAppNavigation({ preventGoBack: isSubmitting });

  function handlePlanSelection(planType: PlanType) {
    setSelectedPlan((prevState) => {
      return planType === prevState ? null : planType;
    });
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      if (selectedPlan) {
        await onSubmit({ selectedPlan });
      }
    } catch (error: any) {
      onError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plansWrapper}>
        {plans.map((plan) => {
          const Icon = planUiDetails[plan.type].icon;
          return (
            <CaloriePlanButton
              disabled={isSubmitting}
              onPress={() => handlePlanSelection(plan.type)}
              selected={plan.type === selectedPlan}
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
        disabled={isSubmitting || !selectedPlan}
        onPress={handleSubmit}
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
