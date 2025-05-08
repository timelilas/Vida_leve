import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { ProgressForm } from "../../../components/ProgressForm";
import { OnProgressSubmitData } from "../../../components/ProgressForm/types";
import { styles } from "./styles";
import { useUser } from "../../../hooks/user/useUser";
import { useProgress } from "../../../hooks/progress/useProgress";
import { useCaloriePlans } from "../../../hooks/caloriePlan/useCaloriePlans";
import { HttpError } from "../../../@core/errors/httpError";

const CreateProgressScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const { updateLocalPlans } = useCaloriePlans({ refetchOnMount: false });
  const { user } = useUser({ refetchOnMount: false });
  const { progress, isUpsertingProgress, upsertProgress } = useProgress({
    refetchOnMount: false
  });
  const navigation = useAppNavigation({ preventGoBack: isUpsertingProgress });

  const initialFormData = {
    gender: user.gender,
    birthDate: user.birthDate ?? "",
    weight: `${progress?.weight ?? ""}`,
    height: progress?.height ? progress.height.toFixed(2) : "",
    goalWeight: `${progress?.goalWeight ?? ""}`,
    activityFrequency: progress?.activityFrequency ?? null
  };

  function goBack() {
    navigation.goBack();
  }

  async function onSubmit(data: OnProgressSubmitData) {
    if (isUpsertingProgress) return;

    const { formData, newCaloriePlans } = data;
    const progressData = await upsertProgress({ ...formData });

    updateLocalPlans(newCaloriePlans);

    navigation.navigate(RouteConstants.PlanSelection, {
      nextRoute: RouteConstants.GoalGuidance,
      plans: newCaloriePlans,
      currentPlan: progressData.currentCaloriePlan
    });
  }

  function onError(error: Error) {
    if (!(error as HttpError).field) {
      showSnackbar({
        duration: 4000,
        message: error.message,
        variant: "error"
      });
    }
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" onBack={goBack} />
      <ScreenTitle style={styles.title} title="Nos conte mais sobre você!" />
      <Paragraph style={styles.description}>
        Precisamos da sua altura, peso atual, meta de peso e frequência de atividade física
        para personalizar sua jornada.
      </Paragraph>
      <ProgressForm
        variant="default"
        submitButtonText="Continuar cadastro"
        initialData={initialFormData}
        onError={onError}
        onSubmit={onSubmit}
      />
    </ScreenWrapper>
  );
};

export default CreateProgressScreen;
