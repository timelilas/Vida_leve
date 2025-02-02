import { StyleSheet } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { useUserStore } from "../../../store/user";
import { useProgressStore } from "../../../store/progress";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
import { heightToString } from "../../../utils/masks";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { httpProgressService } from "../../../services/progress";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { ProgressForm } from "../../../components/progressForm/ProgressForm";
import { OnProgressSubmitData } from "../../../components/progressForm/types";
import { useState } from "react";

const CreateProgressScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const setProgress = useProgressStore((state) => state.setProgress);
  const setPlans = useCaloriePlanStore((state) => state.setPlans);
  const progress = useProgressStore((state) => state.data);
  const gender = useUserStore((state) => state.data.gender);
  const birthDate = useUserStore((state) => state.data.birthDate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useAppNavigation({ preventGoBack: isSubmitting });

  const initialFormData = {
    height: progress?.height ? heightToString(progress?.height) : "",
    weight: progress?.weight ?? 0,
    goalWeight: progress?.goalWeight ?? 0,
    activityFrequency: progress?.activityFrequency ?? null,
    gender: gender,
    birthDate: birthDate,
  };

  function goBack() {
    navigation.goBack();
  }

  async function onSubmit(data: OnProgressSubmitData) {
    setIsSubmitting(true);
    const { formData, newCaloriePlans } = data;
    const { data: responseData } = await httpProgressService.createProgress(
      formData
    );

    setProgress(responseData);
    setPlans(newCaloriePlans);
    setIsSubmitting(false);

    navigation.navigate(RouteConstants.PlanSelection, {
      nextRoute: RouteConstants.GoalGuidance,
      plans: newCaloriePlans,
      curentPlan: responseData.currentCaloriePlan,
    });
  }

  function onError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    if (!(error as any).field) {
      showSnackbar({
        duration: 4000,
        message: error.message,
        variant: "error",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <ScreenHeader style={styles.header} onGoBack={goBack} />
      <ScreenTitle style={styles.title} title="Nos conte mais sobre você!" />
      <Paragraph style={styles.description}>
        Precisamos da sua altura, peso atual, meta de peso e frequência de
        atividade física para personalizar sua jornada.
      </Paragraph>
      <ProgressForm
        variant="default"
        initialData={initialFormData}
        onError={onError}
        onSubmit={onSubmit}
      />
    </ScreenWrapper>
  );
};

export default CreateProgressScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginTop: 8,
  },
});
