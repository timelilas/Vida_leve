import { View } from "react-native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { MealButton } from "./components/MealButton";
import { mealButtonsData } from "./utils";
import { useCallback, useEffect, useState } from "react";
import { MealType } from "../../../@core/entities/@shared/mealType/type";
import { DayPicker } from "../../../components/DayPicker";
import { DateData } from "../../../components/DayPicker/types";
import { RouteConstants, RouteParamsList } from "../../../routes/types";
import { styles } from "./styles";
import {
  convertDateToLocalDateData,
  dateToPTBR,
  formatDateToLabel,
} from "../../../utils/helpers";
import { useMealStore } from "../../../store/meal";
import { useMeal } from "../../../hooks/meal/useMeal";
import { SubmitButton } from "../../../components/SubmitButton";
import {
  CommonActions,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { HttpError } from "../../../@core/errors/httpError";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";

type CreateMealScreenRouteProp = RouteProp<
  RouteParamsList,
  RouteConstants.CreateMeal
>;

interface CreateMealScreenProps {
  route: CreateMealScreenRouteProp;
}

const CreateMealScreen = (props: CreateMealScreenProps) => {
  const navigation = useAppNavigation();
  const routeParams = props.route.params;
  const currentDate = new Date(routeParams?.date || Date.now());

  const { setMeal } = useMealStore((state) => state.actions);
  const { Snackbar, showSnackbar } = useSnackbar();

  const [mealDetails, setMealDetails] = useState<{
    selectedDate: DateData;
    selectedMealType: MealType | null;
  }>({
    selectedDate: convertDateToLocalDateData(currentDate),
    selectedMealType: null,
  });

  const { selectedDate, selectedMealType } = mealDetails;

  const localDate = new Date(
    selectedDate.year,
    selectedDate.month,
    selectedDate.day
  );

  const { meals, dailyConsumption, error, isLoading } = useMeal({
    date: localDate,
    meals: { refetchOnMount: false },
  });

  const dateString = dateToPTBR(localDate);
  const shortDateLabel = formatDateToLabel(localDate, "short");
  const longDateLabel = formatDateToLabel(localDate, "long");

  function goBack() {
    navigation.goBack();
  }

  function handleMealSelection(mealType: MealType) {
    setMealDetails((prevState) => {
      return {
        ...prevState,
        selectedMealType: mealType === selectedMealType ? null : mealType,
      };
    });
  }

  function handleDaySelection(dateData: DateData) {
    setMealDetails((prevState) => {
      const { selectedDate, selectedMealType } = prevState;
      return {
        selectedMealType:
          selectedDate.id === dateData.id ? selectedMealType : null,
        selectedDate: dateData,
      };
    });
  }

  function resetNavigationToHome() {
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: RouteConstants.Home }],
      })
    );
  }

  const handleQueryError = useCallback(
    (error: Error) => {
      const mealsError = `Desculpe, ocorreu um erro ao obter as informações do seu consumo de calorias para o dia ${dateString}.`;

      const errorMessage =
        error instanceof HttpError ? mealsError : NETWORK_ERROR_MESSAGE;

      showSnackbar({
        variant: "error",
        duration: 5000,
        message: errorMessage,
      });
    },
    [showSnackbar, dateString]
  );

  useEffect(() => {
    if (selectedDate && selectedMealType) {
      const { year, month, day } = selectedDate;
      const foundMeal = meals.find((meal) => meal.type === selectedMealType);

      setMeal({
        id: foundMeal?.id,
        date: new Date(year, month, day),
        type: selectedMealType,
        foods: foundMeal?.foods ? foundMeal.foods : [],
      });
      navigation.navigate(
        foundMeal?.foods.length
          ? RouteConstants.MealRegistration
          : RouteConstants.SearchFoods
      );
    }
  }, [selectedDate, selectedMealType, navigation, setMeal]);

  useEffect(() => {
    if (error && !isLoading) handleQueryError(error);
  }, [error, isLoading, handleQueryError]);

  useFocusEffect(
    useCallback(() => {
      setMealDetails((prevState) => ({
        ...prevState,
        selectedMealType: null,
      }));
    }, [])
  );

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader
        variant="titled"
        title="Registrar Refeição"
        subtitle={shortDateLabel}
        onBack={goBack}
      />

      <ScreenTitle
        title={longDateLabel}
        style={[styles.title, styles.dayTitle]}
      />
      <View style={styles.dayPicker}>
        <DayPicker
          currentDate={selectedDate}
          onSelectDate={handleDaySelection}
        />
      </View>
      <ScreenTitle
        title="Agora me conta qual refeição você quer registrar:"
        style={styles.title}
      />
      <View
        style={[
          styles.mealButtons,
          routeParams?.withSubmitButton && styles.marginBottom,
        ]}
      >
        {mealButtonsData.map((meal) => (
          <MealButton
            onPress={() => handleMealSelection(meal.type)}
            key={meal.type}
            icon={meal.icon}
            title={meal.name}
            disabled={!!error}
            isLoading={isLoading}
            selected={meal.type === selectedMealType}
            caloriesConsumed={dailyConsumption[`${meal.type}`]}
          />
        ))}
      </View>
      {routeParams?.withSubmitButton ? (
        <SubmitButton
          type="primary"
          title="Voltar para home"
          style={styles.backHomeButton}
          onPress={resetNavigationToHome}
        />
      ) : null}
    </ScreenWrapper>
  );
};

export default CreateMealScreen;
