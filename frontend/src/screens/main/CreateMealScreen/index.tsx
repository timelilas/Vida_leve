import { View } from "react-native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { MealButton } from "./components/MealButton";
import { mealButtonsData } from "./utils";
import { useEffect, useState } from "react";
import { MealType } from "../../../@core/entities/@shared/mealType/type";
import { DayPicker } from "../../../components/DayPicker";
import { DateData } from "../../../components/DayPicker/types";
import { RouteConstants, RouteParamsList } from "../../../routes/types";
import { styles } from "./styles";
import {
  convertDateToLocalDateData,
  formatDateToLabel,
} from "../../../utils/helpers";
import { useMealStore } from "../../../store/meal";
import { useMeal } from "../../../hooks/meal/useMeal";
import { SubmitButton } from "../../../components/SubmitButton";
import { CommonActions, RouteProp } from "@react-navigation/native";

type CreateMealScreenRouteProp = RouteProp<
  RouteParamsList,
  RouteConstants.CreateMeal
>;

interface CreateMealScreenProps {
  route: CreateMealScreenRouteProp;
}

const CreateMealScreen = (props: CreateMealScreenProps) => {
  const navigation = useAppNavigation();
  const withSubmitButton = props.route.params?.withSubmitButton;

  const mealDate = useMealStore((state) => state.date);
  const existingFoods = useMealStore((state) => state.foodIds.length);
  const currentLocalDate = convertDateToLocalDateData(new Date(mealDate));

  const setMeal = useMealStore((state) => state.setMeal);
  const resetMeal = useMealStore((state) => state.resetMeal);

  const { dailyCalorieConsumption } = useMeal({
    calorieConsumption: { date: new Date(), refetchOnMount: false },
  });

  const [selectedDate, setSelectedDate] = useState<DateData>(currentLocalDate);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(
    null
  );

  useEffect(() => {
    if (selectedDate && selectedMealType) {
      const { year, month, day } = selectedDate;
      setMeal(selectedMealType, new Date(year, month, day));
      navigation.navigate(
        existingFoods
          ? RouteConstants.MealRegistration
          : RouteConstants.SearchFoods
      );
    }
  }, [selectedDate, selectedMealType, navigation, setMeal]);

  function goBack() {
    navigation.goBack();
  }

  function handleMealSelection(mealType: MealType) {
    setSelectedMealType(mealType === selectedMealType ? null : mealType);
  }

  function handleDaySelection(dateData: DateData) {
    setSelectedDate(dateData);
  }

  function resetNavigationToHome() {
    resetMeal();
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: RouteConstants.Home }],
      })
    );
  }

  const currentDate = new Date(
    selectedDate.year,
    selectedDate.month,
    selectedDate.day
  );
  const shortDateLabel = formatDateToLabel(currentDate, "short");
  const longDateLabel = formatDateToLabel(currentDate, "long");

  return (
    <ScreenWrapper>
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
        style={[styles.mealButtons, withSubmitButton && styles.marginBottom]}
      >
        {mealButtonsData.map((meal) => (
          <MealButton
            onPress={() => handleMealSelection(meal.type)}
            key={meal.type}
            icon={meal.icon}
            title={meal.name}
            selected={meal.type === selectedMealType}
            caloriesConsumed={dailyCalorieConsumption.data[`${meal.type}`]}
          />
        ))}
      </View>
      {withSubmitButton ? (
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
