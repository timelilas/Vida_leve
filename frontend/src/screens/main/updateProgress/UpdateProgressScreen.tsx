import { StyleSheet } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { useUserStore } from "../../../store/user";
import { useProgressStore } from "../../../store/progress";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { heightToString } from "../../../utils/masks";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { ProgressForm } from "../../../components/progressForm/ProgressForm";
import { OnProgressSubmitData } from "../../../components/progressForm/types";

const UpdateProgressScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const progress = useProgressStore((state) => state.data);
  const gender = useUserStore((state) => state.data.gender);
  const birthDate = useUserStore((state) => state.data.birthDate);
  const navigation = useAppNavigation();

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
      <ScreenHeader style={styles.header} onGoBack={goBack} />
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
  label: {
    lineHeight: 16,
  },
  form: {
    marginTop: 24,
    marginBottom: 40,
  },
  inputWrapper: {
    gap: 16,
  },
  planSelection: {
    marginTop: 32,
  },
  submitButton: {
    marginTop: "auto",
  },
});
