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

  const setMeal = useMealStore((state) => state.setMeal);
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

  const { meals, calorieConsumption, error, isLoading } = useMeal({
    date: localDate,
    meals: { refetchOnMount: false },
  });

  const dateString = dateToPTBR(localDate);

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
    if (error && !isLoading) {
      const errorMessage = `Desculpe, ocorreu um erro ao obter as informações atualizadas do seu consumo de calorias para o dia ${dateString}`;
      showSnackbar({
        duration: 5000,
        message: errorMessage,
        variant: "error",
      });
    }
  }, [dateString, isLoading, showSnackbar]);

  useFocusEffect(
    useCallback(() => {
      setMealDetails((prevState) => ({ ...prevState, selectedMealType: null }));
    }, [])
  );

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

  const shortDateLabel = formatDateToLabel(localDate, "short");
  const longDateLabel = formatDateToLabel(localDate, "long");

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
            caloriesConsumed={calorieConsumption[`${meal.type}`]}
          />
        ))}
      </View>
      {routeParams?.withSubmitButton ? (
        <SubmitButton
          type="primary"
          title="Voltar para home"
          onPress={resetNavigationToHome}
        />
      ) : null}
    </ScreenWrapper>
  );
};

export default CreateMealScreen;
