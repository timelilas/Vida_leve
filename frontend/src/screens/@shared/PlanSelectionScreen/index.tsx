import { View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants, RouteParamsList } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { RouteProp } from "@react-navigation/native";
import { SuccessModal } from "../../../components/SuccessModal";
import { useState } from "react";
import { styles } from "./styles";
import { FormState, PlanSelectionForm } from "./components/PlanSelectionForm";
import { useProgress } from "../../../hooks/progress/useProgress";
import { useCaloriePlans } from "../../../hooks/caloriePlan/useCaloriePlans";

type PlanSelectionScreenRouteProp = RouteProp<RouteParamsList, RouteConstants.PlanSelection>;

interface PlanSelectionScreenProps {
  route: PlanSelectionScreenRouteProp;
}

const PlanSelectionScreen = ({ route }: PlanSelectionScreenProps) => {
  const navigation = useAppNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Snackbar, showSnackbar } = useSnackbar();
  const { updateLocalPlans } = useCaloriePlans({ refetchOnMount: false });
  const { setCaloriePlan, upsertProgress } = useProgress({
    refetchOnMount: false
  });
  const { progressData, profileData, plans, currentPlan, nextRoute, withModal } = route.params;

  function goBack() {
    navigation.goBack();
  }

  function closeModalAndNavigate() {
    setIsModalVisible(false);
    setTimeout(() => {
      navigation.navigate(nextRoute as any);
    }, 300);
  }

  function navigateAfterSubmit() {
    navigation.navigate(nextRoute as any);
  }

  async function handleSubmit(formState: FormState) {
    if (profileData) return;

    const { selectedPlan } = formState;

    if (progressData) {
      await upsertProgress({
        ...progressData,
        currentCaloriePlan: selectedPlan
      });
      updateLocalPlans(plans);
    } else {
      await setCaloriePlan(selectedPlan);
    }

    if (withModal) setIsModalVisible(true);
    else navigateAfterSubmit();
  }

  async function handleError(error: Error) {
    return showSnackbar({
      duration: 4000,
      message: error.message,
      variant: "error"
    });
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" onBack={goBack} />
      <View style={styles.contentContainer}>
        <ScreenTitle style={styles.title} title="Escolha o plano ideal para você!" />
        <Paragraph style={styles.text}>
          Selecione entre 3 opções de planos para alcançar seus objetivos no seu próprio tempo.
          Seja qual for a sua escolha, estamos prontos para te ajudar a chegar lá!
        </Paragraph>
      </View>
      <PlanSelectionForm
        plans={plans}
        currentPlan={currentPlan}
        onSubmit={handleSubmit}
        onError={handleError}
      />
      {route.params.withModal && (
        <SuccessModal
          isVisible={isModalVisible}
          onClose={closeModalAndNavigate}
          message="Suas informações foram atualizadas com sucesso!"
        />
      )}
    </ScreenWrapper>
  );
};

export default PlanSelectionScreen;
