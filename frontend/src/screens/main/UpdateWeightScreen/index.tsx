import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { ProgressForm } from "../../../components/ProgressForm";
import { OnProgressSubmitData } from "../../../components/ProgressForm/types";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";
import { useUser } from "../../../hooks/user/useUser";
import { useProgress } from "../../../hooks/progress/useProgress";
import { useRef, useState } from "react";
import { CaloriePlanProps } from "../../../@core/entities/caloriePlan/type";
import { ProgressProps } from "../../../@core/entities/progress/type";
import { AlertModal } from "../../../components/AlertModal";
import { useWeightHistory } from "../../../hooks/weight/useWeightHistory";

const UpdateWeightScreen = () => {
  const navigation = useAppNavigation();
  const { Snackbar, showSnackbar } = useSnackbar();
  const { progress } = useProgress({ refetchOnMount: false });
  const { user } = useUser({ refetchOnMount: false });
  const { data: weightHistory } = useWeightHistory({ enabled: false });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const caloriePlansRef = useRef<CaloriePlanProps[] | null>(null);
  const formDataAfterSubmit = useRef<Omit<
    ProgressProps,
    "currentCaloriePlan" | "lastWeightUpdateAt"
  > | null>(null);

  const initialFormData = {
    height: `${progress?.height ?? ""}`,
    weight: `${progress?.weight ?? ""}`,
    goalWeight: `${progress?.goalWeight ?? ""}`,
    activityFrequency: progress?.activityFrequency ?? null,
    gender: user.gender,
    birthDate: user.birthDate ?? ""
  };

  function goBack() {
    navigation.goBack();
  }

  function showErrorSnackbar(message: string) {
    showSnackbar({ duration: 4000, message: message, variant: "error" });
  }

  function onCloseModal() {
    setIsModalVisible(false);
  }

  function onConfirmModal() {
    setIsModalVisible(false);
    if (caloriePlansRef.current && formDataAfterSubmit.current) {
      navigation.navigate(RouteConstants.PlanSelection, {
        nextRoute: RouteConstants.Home,
        withModal: true,
        plans: caloriePlansRef.current,
        currentPlan: null,
        progressData: formDataAfterSubmit.current
      });
    }
  }

  function onError(error: Error) {
    if (!(error as any).field) {
      showErrorSnackbar(error.message);
    }
  }

  async function onSubmit(data: OnProgressSubmitData) {
    const { formData, newCaloriePlans } = data;
    const newWeight = formData.weight;
    const currentWeight = progress?.weight;

    if (newWeight !== currentWeight && weightHistory.weights.length) {
      caloriePlansRef.current = newCaloriePlans;
      formDataAfterSubmit.current = formData;
      setIsModalVisible(true);
    } else {
      caloriePlansRef.current = null;
      formDataAfterSubmit.current = null;
      navigation.navigate(RouteConstants.PlanSelection, {
        nextRoute: RouteConstants.Home,
        withModal: true,
        plans: newCaloriePlans,
        currentPlan: null,
        progressData: formData
      });
    }
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" onBack={goBack} />
      <ScreenTitle style={styles.title} title="Ajuste sua meta de perda de peso" />
      <Paragraph style={styles.description}>
        Para ajudá-lo a alcançar seus objetivos de saúde, atualize seu peso atual, defina seu
        peso desejado e ajuste sua rotina de atividade física.
      </Paragraph>
      <ProgressForm
        variant="goalAdjustments"
        submitButtonText="Continuar"
        initialData={initialFormData}
        onError={onError}
        onSubmit={onSubmit}
      />
      <AlertModal
        title="Atualizar peso atual"
        message="Ao mudar o peso atual, todos os registros anteriores de peso serão apagados do histórico de peso. Essa alteração não poderá ser desfeita."
        onConfirmText="Sim, alterar"
        onCancelText="Não, cancelar"
        isVisible={isModalVisible}
        onCancel={onCloseModal}
        onConfirm={onConfirmModal}
      />
    </ScreenWrapper>
  );
};

export default UpdateWeightScreen;
