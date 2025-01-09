import { StyleSheet, View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
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

type PlanSelectionScreenlRouteProp = RouteProp<
  RouteParamsList,
  RouteConstants.PlanSelection
>;

interface PlanSelectionScreenProps {
  route: PlanSelectionScreenlRouteProp;
}

const PlanSelectionScreen = ({ route }: PlanSelectionScreenProps) => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const setProgress = useProgressStore((state) => state.setProgress);
  const navigation = useAppNavigation();
  const caloriePlans = useCaloriePlanStore((state) => state.data);
  const planType = useProgressStore((state) => state.data?.currentCaloriePlan);

  function goBack() {
    navigation.goBack();
  }

  function navigateAfterSubmit() {
    navigation.navigate(route.params.nextRoute as any);
  }

  async function handleSubmit(formState: FormState) {
    const { isFormDirty, selectedPlan } = formState;
    if (!isFormDirty) return navigateAfterSubmit();

    const { data } = await httpProgressService.setCaloriePlan(selectedPlan);

    setProgress(data);
    navigateAfterSubmit();
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
      <ScreenHeader onGoBack={goBack} />
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
        plans={caloriePlans}
        currentPlan={planType || null}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </ScreenWrapper>
  );
};

export default PlanSelectionScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
  },
  text: {
    marginTop: 8,
    marginBottom: 24,
  },
  contentContainer: {
    marginTop: 16,
  },
  plansWrapper: {
    paddingBottom: 16,
    gap: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  submitButton: {
    marginTop: "auto",
  },
});
