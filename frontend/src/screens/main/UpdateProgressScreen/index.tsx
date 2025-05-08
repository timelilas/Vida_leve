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

type UpdateProgressScreenRouteProp = RouteProp<RouteParamsList, RouteConstants.UpdateProgress>;

interface UpdateProgressScreenProps {
  route: UpdateProgressScreenRouteProp;
}

const UpdateProgressScreen = ({ route }: UpdateProgressScreenProps) => {
  const { profileData } = route.params;
  const { progress } = useProgress({ refetchOnMount: false });
  const navigation = useAppNavigation();
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

  async function onSubmit(data: OnProgressSubmitData) {
    navigation.navigate(RouteConstants.PlanSelection, {
      withModal: true,
      nextRoute: RouteConstants.Home,
      plans: data.newCaloriePlans,
      currentPlan: null,
      progressData: data.formData,
      profileData: profileData
    });
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
    </ScreenWrapper>
  );
};

export default UpdateProgressScreen;
