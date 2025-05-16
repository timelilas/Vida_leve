import { RouteProp } from "@react-navigation/native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { ProgressForm } from "../../../components/ProgressForm";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { useProgress } from "../../../hooks/progress/useProgress";
import { RouteConstants, RouteParamsList } from "../../../routes/types";
import { styles } from "./styles";
import { OnProgressSubmitData } from "../../../components/ProgressForm/types";
import { AlertModal } from "../../../components/AlertModal";
import { useRef, useState } from "react";
import { CaloriePlanProps } from "../../../@core/entities/caloriePlan/type";
import { ProgressProps } from "../../../@core/entities/progress/type";

type UpdateProgressScreenRouteProp = RouteProp<RouteParamsList, RouteConstants.UpdateProgress>;

interface UpdateProgressScreenProps {
  route: UpdateProgressScreenRouteProp;
}

const UpdateProgressScreen = ({ route }: UpdateProgressScreenProps) => {
  const navigation = useAppNavigation();
  const { profileData } = route.params;
  const { progress } = useProgress({ refetchOnMount: false });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const caloriePlansRef = useRef<CaloriePlanProps[] | null>(null);
  const formDataAfterSubmit = useRef<Omit<ProgressProps, "currentCaloriePlan"> | null>(null);

  const formInitialData = {
    height: `${progress?.height ?? ""}`,
    weight: `${progress?.weight ?? ""}`,
    goalWeight: `${progress?.goalWeight ?? ""}`,
    activityFrequency: progress?.activityFrequency ?? null,
    gender: profileData.gender,
    birthDate: profileData.birthDate
  };

  function goBack() {
    navigation.goBack();
  }

  function onCloseModal() {
    setIsModalVisible(false);
  }

  function onConfirmModal() {
    setIsModalVisible(false);
    if (caloriePlansRef.current && formDataAfterSubmit.current) {
      navigation.navigate(RouteConstants.PlanSelection, {
        withModal: true,
        nextRoute: RouteConstants.Home,
        plans: caloriePlansRef.current,
        currentPlan: null,
        progressData: formDataAfterSubmit.current,
        profileData: profileData
      });
    }
  }

  async function onSubmit(data: OnProgressSubmitData) {
    const newWeight = data.formData.weight;
    const currentWeight = progress?.weight;
    if (newWeight !== currentWeight) {
      caloriePlansRef.current = data.newCaloriePlans;
      formDataAfterSubmit.current = data.formData;
      setIsModalVisible(true);
    } else {
      caloriePlansRef.current = null;
      formDataAfterSubmit.current = null;
      navigation.navigate(RouteConstants.PlanSelection, {
        withModal: true,
        nextRoute: RouteConstants.Home,
        plans: data.newCaloriePlans,
        currentPlan: null,
        progressData: data.formData,
        profileData: profileData
      });
    }
  }

  return (
    <ScreenWrapper>
      <NavigationHeader onBack={goBack} variant="branded" />
      <ScreenTitle style={styles.title} title="Informações atualizadas!" />
      <Paragraph style={styles.text}>
        Agora, se quiser, você pode ajustar sua altura, peso atual, peso desejado e frequência
        de atividade física para manter suas metas sempre em dia.
      </Paragraph>
      <ProgressForm
        variant="default"
        onSubmit={onSubmit}
        initialData={formInitialData}
        submitButtonText="Continuar"
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

export default UpdateProgressScreen;
