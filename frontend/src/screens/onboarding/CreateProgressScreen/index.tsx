import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { useProgressStore } from "../../../store/progress";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { httpProgressService } from "../../../services/progress";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { ProgressForm } from "../../../components/ProgressForm";
import { OnProgressSubmitData } from "../../../components/ProgressForm/types";
import { useState } from "react";
import { styles } from "./styles";
import { useUser } from "../../../hooks/user/useUser";

const CreateProgressScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const setProgress = useProgressStore((state) => state.setProgress);
  const setPlans = useCaloriePlanStore((state) => state.setPlans);
  const progress = useProgressStore((state) => state.data);
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useAppNavigation({ preventGoBack: isSubmitting });

  const initialFormData = {
    gender: user.gender,
    birthDate: user.birthDate ?? "",
    weight: `${progress?.weight ?? ""}`,
    height: progress?.height ? progress.height.toFixed(2) : "",
    goalWeight: `${progress?.goalWeight ?? ""}`,
    activityFrequency: progress?.activityFrequency ?? null,
  };

  function goBack() {
    navigation.goBack();
  }

  async function onSubmit(data: OnProgressSubmitData) {
    setIsSubmitting(true);
    const { formData, newCaloriePlans } = data;
    const { data: responseData } = await httpProgressService.upsertProgress(
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
      <NavigationHeader variant="branded" onBack={goBack} />
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
