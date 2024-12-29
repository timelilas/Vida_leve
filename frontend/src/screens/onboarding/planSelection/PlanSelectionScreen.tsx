import { StyleSheet, View, ScrollView } from "react-native";
import { PlanType } from "../../../@core/entities/@shared/planType/type";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { CaloriePlanButton } from "../../../components/buttons/CaloriePlanButton";
import { planUiDetails } from "./utils";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
import { useRef } from "react";
import { httpAuthService } from "../../../services/auth";
import { useForm } from "../../../hooks/useForm";
import { HttpError } from "../../../@core/errors/httpError";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useProgressStore } from "../../../store/progress";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { httpProgressService } from "../../../services/progress";

const PlanSelectionScreen = () => {
  const navigation = useAppNavigation();
  const planType = useProgressStore((state) => state.data?.currentCaloriePlan);
  const scrollRef = useRef<ScrollView>(null);
  const caloriePlans = useCaloriePlanStore((state) => state.data);
  const setProgress = useProgressStore((state) => state.setProgress);
  const { handleChange, setError, onSubmit, data } = useForm<{
    planType: PlanType | null;
  }>({ initialState: { planType: planType ?? null } });
  const { error, isSubmitting, values, isFormDirty } = data;

  function goBack() {
    if (!isSubmitting) {
      navigation.goBack();
    }
  }

  function scrollToTop() {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  function handleUnexpectedError() {
    scrollToTop();
    setError({ message: UNEXPECTED_ERROR_MESSAGE });
  }

  function navigateToGuidance() {
    navigation.navigate(RouteConstants.GoalGuidance);
  }

  function setPlanError() {
    setError({ field: "planType" });
  }

  function handlePlanSelection(planType: PlanType) {
    if (planType === values.planType) {
      handleChange("planType", null);
      setPlanError();
    } else {
      handleChange("planType", planType);
      setError({});
    }
  }

  async function handleSubmit() {
    if (!values.planType) return setPlanError();
    if (!isFormDirty) return navigateToGuidance();

    const { data } = await httpProgressService.setCaloriePlan(values.planType);
    setProgress(data);
    navigateToGuidance();
  }

  async function handleError(error: Error) {
    if (error instanceof HttpError) {
      !error.field && scrollToTop();
      return setError({ field: error.field as any, message: error.message });
    }
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    handleUnexpectedError();
  }

  return (
    <ScreenWrapper ref={scrollRef} scrollable>
      <ScreenHeader onGoBack={goBack} />
      <View style={styles.contentContainer}>
        <ScreenTitle
          style={styles.title}
          title="Escolha o plano ideal para você!"
        />
        <Paragraph
          style={styles.text}
          text="Selecione entre 3 opções de planos para alcançar seus objetivos no seu próprio tempo. Seja qual for a sua escolha, estamos prontos para te ajudar a chegar lá!"
        />
        <View style={styles.plansWrapper}>
          {caloriePlans.map((plan) => {
            const Icon = planUiDetails[plan.type].icon;
            return (
              <CaloriePlanButton
                onPress={() => handlePlanSelection(plan.type)}
                selected={plan.type === values.planType}
                key={plan.type}
                icon={<Icon />}
                title={planUiDetails[plan.type].title}
                dailyCalories={plan.dailyCalorieIntake}
                duration={Math.ceil(plan.durationInDays / 7)}
              />
            );
          })}
        </View>
      </View>
      <SubmitButton
        disabled={isSubmitting || error.field === "planType"}
        onPress={onSubmit(handleSubmit, handleError)}
        title="Salvar informações"
        type="primary"
        style={styles.submitButton}
      />
    </ScreenWrapper>
  );
};

export default PlanSelectionScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
  },
  text: {
    marginTop: 8,
    marginBottom: 24,
  },
  contentContainer: {
    marginTop: 16,
    marginBottom: 40,
  },
  plansWrapper: {
    paddingBottom: 16,
    gap: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  submitButton: {
    marginTop: "auto",
  },
});
