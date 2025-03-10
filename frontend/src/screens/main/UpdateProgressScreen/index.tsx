import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { ProgressForm } from "../../../components/ProgressForm";
import { OnProgressSubmitData } from "../../../components/ProgressForm/types";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";
import { useUser } from "../../../hooks/user/useUser";
import { useProgress } from "../../../hooks/progress/useProgress";

const UpdateProgressScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const { progress } = useProgress({ refetchOnMount: false });
  const { user } = useUser({ refetchOnMount: false });
  const navigation = useAppNavigation();

  const initialFormData = {
    height: `${progress?.height ?? ""}`,
    weight: `${progress?.weight ?? ""}`,
    goalWeight: `${progress?.goalWeight ?? ""}`,
    activityFrequency: progress?.activityFrequency ?? null,
    gender: user.gender,
    birthDate: user.birthDate ?? "",
  };

  function goBack() {
    navigation.goBack();
  }

  function showErrorSnackbar(message: string) {
    showSnackbar({ duration: 4000, message: message, variant: "error" });
  }

  async function onSubmit(data: OnProgressSubmitData) {
    const { formData, newCaloriePlans } = data;
    navigation.navigate(RouteConstants.PlanSelection, {
      nextRoute: RouteConstants.Home,
      withModal: true,
      plans: newCaloriePlans,
      curentPlan: null,
      progressData: formData,
    });
  }

  function onError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    if (!(error as any).field) {
      showErrorSnackbar(error.message);
    }
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" onBack={goBack} />
      <ScreenTitle
        style={styles.title}
        title="Ajuste sua meta de perda de peso"
      />
      <Paragraph style={styles.description}>
        Para ajudá-lo a alcançar seus objetivos de saúde, atualize seu peso
        atual, defina seu peso desejado e ajuste sua rotina de atividade física.
      </Paragraph>
      <ProgressForm
        variant="goalAdjustments"
        initialData={initialFormData}
        onError={onError}
        onSubmit={onSubmit}
      />
    </ScreenWrapper>
  );
};

export default UpdateProgressScreen;
