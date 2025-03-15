import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { styles } from "./styles";
import { View } from "react-native";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { MealItem } from "./components/MealItem";
import { useMealStore } from "../../../store/meal";
import { MealRegistrationData, MealSummary } from "./components/MealSummary";
import {
  delay,
  formatDateToLabel,
  getTitleFromMealType,
} from "../../../utils/helpers";
import { RouteConstants } from "../../../routes/types";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { useEffect, useState } from "react";
import { useMeal } from "../../../hooks/meal/useMeal";
import { CommonActions } from "@react-navigation/native";
import { SuccessModal } from "../../../components/SuccessModal";

const MealRegistrationScreen = () => {
  const navigation = useAppNavigation();
  const mealDate = useMealStore((state) => state.date);
  const mealType = useMealStore((state) => state.type);
  const foodIds = useMealStore((state) => state.foodIds);
  const mealId = useMealStore((state) => state.foodIds);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const collapseAllItems = useMealStore((state) => state.collapseAllItems);
  const { Snackbar, showSnackbar } = useSnackbar();

  const { createMeal, updateMeal } = useMeal({
    meals: { refetchOnMount: false },
  });

  useEffect(() => {
    if (!foodIds.length) {
      navigation.dispatch(
        CommonActions.reset({
          index: 2,
          routes: [
            { name: RouteConstants.Home },
            { name: RouteConstants.CreateMeal },
            { name: RouteConstants.SearchFoods },
          ],
        })
      );
    }
  }, [foodIds.length, navigation]);

  function goBack() {
    if (isSubmitting) return;
    navigation.goBack();
  }

  function resetNavigationToHome() {
    const isoDate = new Date(mealDate).toISOString();
    const createMealRouteParams = { withSubmitButton: true, date: isoDate };

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: RouteConstants.Home },
          { name: RouteConstants.CreateMeal, params: createMealRouteParams },
        ],
      })
    );
  }

  function handleError(error: Error) {
    setIsSubmitting(false);

    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    showSnackbar({ duration: 5000, message: error.message, variant: "error" });
  }

  async function handleSubmit(data: MealRegistrationData) {
    if (isSubmitting) return;

    collapseAllItems();
    setIsSubmitting(true);
    await delay(250);

    const { id, date, foods, mealType } = data;

    if (id) {
      await updateMeal({ mealId: id, foods });
    } else {
      await createMeal({ date, mealType, foods });
    }

    setIsModalVisible(true);
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  function closeModalAndResetNavigation() {
    setIsModalVisible(false);
    setTimeout(() => {
      resetNavigationToHome();
    }, 300);
  }

  const shortDateLabel = formatDateToLabel(new Date(mealDate), "short");

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      snackbar={<Snackbar />}
    >
      <View style={styles.body}>
        <NavigationHeader
          variant="titled"
          title={getTitleFromMealType(mealType)}
          subtitle={shortDateLabel}
          onBack={goBack}
        />
        <View style={styles.textWrapper}>
          <ScreenTitle
            title="Aqui está sua refeição até agora"
            style={styles.title}
          />
          <Paragraph style={styles.text}>
            Confira os alimentos que você adicionou. Precisa incluir mais? Toque
            em “Adicionar Alimento”. Se já tiver tudo certo, finalize
            registrando sua refeição e acompanhe seu progresso diário.
          </Paragraph>
        </View>
      </View>
      <View>
        {foodIds.map((id) => (
          <MealItem key={`${id}`} foodId={`${id}`} disabled={isSubmitting} />
        ))}
      </View>
      <MealSummary
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onError={handleError}
      />
      <SuccessModal
        isVisible={isModalVisible}
        onClose={closeModalAndResetNavigation}
        message={
          mealId
            ? "Sua refeição foi atualizada com sucesso!"
            : "Sua refeição foi registrada com sucesso!"
        }
      />
    </ScreenWrapper>
  );
};

export default MealRegistrationScreen;
