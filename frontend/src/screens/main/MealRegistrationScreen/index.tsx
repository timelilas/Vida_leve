import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { styles } from "./styles";
import { View } from "react-native";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { MealItem } from "./components/MealItem";
import { useMealStore } from "../../../store/meal";
import { MealSummary } from "./components/MealSummary";
import {
  delay,
  formatDateToLabel,
  getTitleFromMealType,
} from "../../../utils/helpers";
import { RouteConstants } from "../../../routes/types";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { useEffect, useState } from "react";
import { CreateMealParams } from "../../../hooks/meal/types";
import { useMeal } from "../../../hooks/meal/useMeal";
import { CommonActions } from "@react-navigation/native";
import { SuccessModal } from "../../../components/SuccessModal";

const MealRegistrationScreen = () => {
  const navigation = useAppNavigation();
  const mealDate = useMealStore((state) => state.date);
  const mealType = useMealStore((state) => state.type);
  const foodIds = useMealStore((state) => state.foodIds);
  const shortDateLabel = formatDateToLabel(new Date(mealDate), "short");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const collapseAllItems = useMealStore((state) => state.collapseAllItems);
  const resetMeal = useMealStore((state) => state.resetMeal);
  const { Snackbar, showSnackbar } = useSnackbar();
  const { createMeal } = useMeal({
    calorieConsumption: { refetchOnMount: false },
  });

  useEffect(() => {
    if (!foodIds.length) {
      navigation.dispatch(
        CommonActions.reset({
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
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: RouteConstants.Home },
          {
            name: RouteConstants.CreateMeal,
            params: { withSubmitButton: true },
          },
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

  async function handleSubmit(data: CreateMealParams) {
    if (isSubmitting) return;

    collapseAllItems();
    setIsSubmitting(true);
    await delay(200);

    const { date, foods, mealType } = data;
    await createMeal({ date, mealType, foods });

    setIsModalVisible(true);
    setIsSubmitting(false);
    resetMeal(date);
  }

  function closeModalAndResetNavigation() {
    setIsModalVisible(false);
    setTimeout(() => {
      resetNavigationToHome();
    }, 300);
  }

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
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onError={handleError}
      />
      <SuccessModal
        isVisible={isModalVisible}
        onClose={closeModalAndResetNavigation}
        message="Sua refeição foi registrada com sucesso!"
      />
    </ScreenWrapper>
  );
};

export default MealRegistrationScreen;
