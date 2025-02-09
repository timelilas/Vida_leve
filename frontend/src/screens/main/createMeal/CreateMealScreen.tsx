import { StyleSheet, View } from "react-native";
import { NavigationHeader } from "../../../components/navigationHeader/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { MealButton } from "./components/MealButton";
import { mealButtonsData } from "./utils";
import { useState } from "react";
import { MealType } from "../../../@core/entities/@shared/meal/type";
import { DayPicker } from "../../../components/dayPicker/DayPicker";
import { DateData } from "../../../components/dayPicker/types";
import {
  convertDateToDateData,
  getMonthNameFromIndex,
  getWeekdayFromIndex,
  toCapitalized,
} from "../../../utils/helpers";

const CreateMealScreen = () => {
  const navigation = useAppNavigation();
  const today = convertDateToDateData(new Date());
  const [selectedDate, setSelectedDate] = useState<DateData>(today);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);

  function goBack() {
    navigation.goBack();
  }

  function handleMealSelection(mealType: MealType) {
    setSelectedMeal(mealType === selectedMeal ? null : mealType);
  }

  function handleDaySelection(dateData: DateData) {
    setSelectedDate(dateData);
  }

  const isSlectedDateToday = today.id === selectedDate?.id;
  const weekdayName = toCapitalized(getWeekdayFromIndex(selectedDate.weekDay));
  const monthName = toCapitalized(
    getMonthNameFromIndex(selectedDate.month)
  ).slice(0, 3);

  return (
    <ScreenWrapper>
      <NavigationHeader
        variant="titled"
        title="Registrar Refeição"
        subtitle="Terça, 08 OUT."
        onBack={goBack}
      />
      <ScreenTitle
        title={`${
          isSlectedDateToday
            ? "Hoje"
            : `${weekdayName}, ${selectedDate.day} de ${monthName} - ${selectedDate.year}`
        }`}
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
      <View style={styles.mealButtons}>
        {mealButtonsData.map((meal) => (
          <MealButton
            onPress={() => handleMealSelection(meal.type)}
            key={meal.type}
            icon={meal.icon}
            title={meal.name}
            selected={meal.type === selectedMeal}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  dayPicker: {
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
  },
  dayTitle: {
    color: "#242424",
    marginTop: 16,
    marginInline: "auto",
  },
  mealButtons: {
    marginTop: 16,
    gap: 16,
  },
});

export default CreateMealScreen;
