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
import { dateToPTBR, formatDateToLabel, getTitleFromMealType } from "../../../utils/helpers";
import { RouteConstants } from "../../../routes/types";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { useEffect, useState } from "react";
import { useMeal } from "../../../hooks/meal/useMeal";
import { CommonActions } from "@react-navigation/native";
import { SuccessModal } from "../../../components/SuccessModal";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { HttpError } from "../../../@core/errors/httpError";

const MealRegistrationScreen = () => {
  const navigation = useAppNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const mealDate = useMealStore((state) => state.date);
  const mealType = useMealStore((state) => state.type);
  const foodIds = useMealStore((state) => state.foodIds);

  const { collapseAllItems } = useMealStore((state) => state.actions);
  const { Snackbar, showSnackbar } = useSnackbar();

  const {
    isCreatingMeal,
    isUpdatingMeal,
    isMealCreated,
    isMealUpdated,
    createMeal,
    updateMeal
  } = useMeal({
    meals: { refetchOnMount: false }
  });

  useEffect(() => {
    if (!foodIds.length) {
      navigation.dispatch(
        CommonActions.reset({
          index: 2,
          routes: [
            { name: RouteConstants.Home },
            { name: RouteConstants.CreateMeal },
            { name: RouteConstants.SearchFoods }
          ]
        })
      );
    }
  }, [foodIds.length, navigation]);

  function goBack() {
    if (isCreatingMeal || isUpdatingMeal) return;
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
          { name: RouteConstants.CreateMeal, params: createMealRouteParams }
        ]
      })
    );
  }

  function closeModalAndResetNavigation() {
    setIsModalVisible(false);
    setTimeout(() => resetNavigationToHome(), 300);
  }

  function handleError(error: Error) {
    let defaultMessage = NETWORK_ERROR_MESSAGE;
    if (error instanceof HttpError) {
      if (error.status === 409) {
        const formattedDate = dateToPTBR(new Date(mealDate));
        defaultMessage = `Desculpe, você já possui uma refeição do tipo '${mealType}' registrada na data '${formattedDate}'.`;
      } else {
        defaultMessage = `Desculpe, houve um erro durante o cadastro da sua refeição. Tente novamente mais tarde.`;
      }
    }
    showSnackbar({ duration: 5000, message: defaultMessage, variant: "error" });
  }

  async function handleSubmit(data: MealRegistrationData) {
    if (isCreatingMeal || isUpdatingMeal) return;

    collapseAllItems();

    const { id, date, foods, mealType } = data;
    if (id) {
      await updateMeal({ mealId: id, foods });
    } else {
      await createMeal({ date, mealType, foods });
    }
    setIsModalVisible(true);
  }

  const shortDateLabel = formatDateToLabel(new Date(mealDate), "short");

  return (
    <ScreenWrapper contentContainerStyle={styles.container} snackbar={<Snackbar />}>
      <View style={styles.body}>
        <View style={styles.textContainer}>
          <NavigationHeader
            variant="titled"
            title={getTitleFromMealType(mealType)}
            subtitle={shortDateLabel}
            onBack={goBack}
          />
          <View style={styles.textWrapper}>
            <ScreenTitle title="Aqui está sua refeição até agora" style={styles.title} />
            <Paragraph style={styles.text}>
              Confira os alimentos que você adicionou. Precisa incluir mais? Toque em
              “Adicionar Alimento”. Se já tiver tudo certo, finalize registrando sua refeição e
              acompanhe seu progresso diário.
            </Paragraph>
          </View>
        </View>
        <View style={styles.foodItems}>
          {foodIds.map((id) => (
            <MealItem
              key={`${id}`}
              foodId={`${id}`}
              disabled={isCreatingMeal || isUpdatingMeal}
            />
          ))}
        </View>
      </View>
      <MealSummary
        style={styles.summaryContainer}
        isSubmitted={isMealCreated || isMealUpdated}
        isSubmitting={isCreatingMeal || isUpdatingMeal}
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
