import { StyleSheet, View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/navigationHeader/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useProgressStore } from "../../../store/progress";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants, RouteParamsList } from "../../../routes/types";
import { httpProgressService } from "../../../services/progress";
import { useSnackbar } from "../../../hooks/useSnackbar";
import {
  FormState,
  PlanSelectionForm,
} from "./components/planSelectionForm/PlanSelectionForm";
import { RouteProp } from "@react-navigation/native";
import { SuccessModal } from "../../../components/successModal/SuccessModal";
import { useState } from "react";
import { useCaloriePlanStore } from "../../../store/caloriePlan";

type PlanSelectionScreenRouteProp = RouteProp<
  RouteParamsList,
  RouteConstants.PlanSelection
>;

interface PlanSelectionScreenProps {
  route: PlanSelectionScreenRouteProp;
}

const PlanSelectionScreen = ({ route }: PlanSelectionScreenProps) => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const setProgress = useProgressStore((state) => state.setProgress);
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
    let apiResponse;

    if (progressData) {
      apiResponse = await httpProgressService.upsertProgress({
        ...progressData,
        currentCaloriePlan: selectedPlan,
      });
      setPlans(plans);
    } else {
      apiResponse = await httpProgressService.setCaloriePlan(selectedPlan);
    }

    setProgress(apiResponse.data);

    if (withModal) {
      setIsModalVisible(true);
    } else {
      navigateAfterSubmit();
    }
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

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 16,
  },
  title: {
    textAlign: "left",
  },
  text: {
    marginTop: 8,
    marginBottom: 40,
  },
  submitButton: {
    marginTop: "auto",
  },
});
