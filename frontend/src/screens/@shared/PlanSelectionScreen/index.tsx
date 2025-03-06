import { View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants, RouteParamsList } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { RouteProp } from "@react-navigation/native";
import { SuccessModal } from "../../../components/SuccessModal";
import { useState } from "react";
import { styles } from "./styles";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
import { FormState, PlanSelectionForm } from "./components/PlanSelectionForm";
import { useProgress } from "../../../hooks/progress/useProgress";

type PlanSelectionScreenRouteProp = RouteProp<
  RouteParamsList,
  RouteConstants.PlanSelection
>;

interface PlanSelectionScreenProps {
  route: PlanSelectionScreenRouteProp;
}

const PlanSelectionScreen = ({ route }: PlanSelectionScreenProps) => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const { setCaloriePlan, upsertProgress } = useProgress();
  const setPlans = useCaloriePlanStore((state) => state.setPlans);
  const navigation = useAppNavigation();
  const { progressData, plans, curentPlan, nextRoute, withModal } =
    route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    const { selectedPlan } = formState;

    if (progressData) {
      await upsertProgress({
        ...progressData,
        currentCaloriePlan: selectedPlan,
      });
      setPlans(plans);
    } else {
      await setCaloriePlan(selectedPlan);
    }

    if (withModal) setIsModalVisible(true);
    else navigateAfterSubmit();
  }

  async function handleError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }

    return showSnackbar({
      duration: 4000,
      message: error.message,
      variant: "error",
    });
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" onBack={goBack} />
      <View style={styles.contentContainer}>
        <ScreenTitle
          style={styles.title}
          title="Escolha o plano ideal para você!"
        />
        <Paragraph style={styles.text}>
          Selecione entre 3 opções de planos para alcançar seus objetivos no seu
          próprio tempo. Seja qual for a sua escolha, estamos prontos para te
          ajudar a chegar lá!
        </Paragraph>
      </View>
      <PlanSelectionForm
        plans={plans}
        currentPlan={curentPlan}
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
