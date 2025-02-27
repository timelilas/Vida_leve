import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { useUserStore } from "../../../store/user";
import { useProgressStore } from "../../../store/progress";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { ProgressForm } from "../../../components/ProgressForm";
import { OnProgressSubmitData } from "../../../components/ProgressForm/types";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";

const UpdateProgressScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const progress = useProgressStore((state) => state.data);
  const gender = useUserStore((state) => state.data.gender);
  const birthDate = useUserStore((state) => state.data.birthDate);
  const navigation = useAppNavigation();

  const initialFormData = {
    height: `${progress?.height ?? ""}`,
    weight: `${progress?.weight ?? ""}`,
    goalWeight: `${progress?.goalWeight ?? ""}`,
    activityFrequency: progress?.activityFrequency ?? null,
    gender: gender,
    birthDate: birthDate ?? "",
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
