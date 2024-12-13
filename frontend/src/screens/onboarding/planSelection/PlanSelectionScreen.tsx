import { StyleSheet, View, Platform, ScrollView } from "react-native";
import { PlanType } from "../../../@core/entities/@shared/plantType";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationProp } from "@react-navigation/native";
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
import { ErrorMessage } from "../../../components/ErrorMessage";

type PlanSelectionScreenProps = {
  navigation: NavigationProp<any>;
};

const PlanSelectionScreen = (props: PlanSelectionScreenProps) => {
  const currentPlan = useProgressStore(
    (state) => state.data?.currentCaloriePlan
  );
  const scrollRef = useRef<ScrollView>(null);
  const caloriePlans = useCaloriePlanStore((state) => state.data);
  const setProgress = useProgressStore((state) => state.setProgress);
  const { handleChange, setError, onSubmit, data } = useForm<{
    plan: PlanType | null;
  }>({ initialState: { plan: currentPlan ?? null } });
  const { error, isSubmitting, values } = data;

  function setPlanError() {
    setError({
      field: undefined,
      message: "É necessário selecionar um plano para continuar.",
    });
  }

  function handlePlanSelection(planType: PlanType) {
    if (planType === values.plan) {
      handleChange("plan", null);
      setPlanError();
    } else {
      handleChange("plan", planType);
      setError({});
    }
  }

  async function handleSubmit() {
    if (!values.plan) {
      return setPlanError();
    }
    const { data } = await httpAuthService.setCaloriePlan(values.plan);
    setProgress(data);
    props.navigation.navigate("Onboarding/GoalGuidance");
  }

  async function handleError(error: Error) {
    if (error instanceof HttpError) {
      !error.field && scrollRef.current?.scrollTo({ y: 0, animated: true });
      return setError({ field: error.field as any, message: error.message });
    }
    if (error instanceof ConnectionError) {
      return props.navigation.navigate("ConnectionError");
    }
    setError({ message: UNEXPECTED_ERROR_MESSAGE });
  }

  return (
    <ScreenWrapper ref={scrollRef} scrollable>
      <ScreenHeader onGoBack={() => props.navigation.goBack()} />
      <View style={styles.contentContainer}>
        <ScreenTitle
          style={styles.title}
          title="Escolha o plano ideal para você!"
        />
        <Paragraph
          style={styles.text}
          text="Selecione entre 3 opções de planos para alcançar seus objetivos no seu próprio tempo. Seja qual for a sua escolha, estamos prontos para te ajudar a chegar lá!"
        />
        {error.message && (
          <ErrorMessage style={styles.error} message={error.message} />
        )}
        <View style={styles.plansWrapper}>
          {caloriePlans.map((plan) => {
            const icon = planUiDetails[plan.type].icon;
            return (
              <CaloriePlanButton
                onPress={() => handlePlanSelection(plan.type)}
                selected={plan.type === values.plan}
                key={plan.type}
                icon={icon({})}
                title={planUiDetails[plan.type].title}
                dailyCalories={plan.dailyCalorieIntake}
                duration={Math.ceil(plan.durationInDays / 7)}
              />
            );
          })}
        </View>
      </View>
      <SubmitButton
        disabled={isSubmitting}
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
  error: {
    marginBottom: 8,
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
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    paddingBottom: 16,
    gap: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  submitButton: {
    marginTop: "auto",
  },
});
