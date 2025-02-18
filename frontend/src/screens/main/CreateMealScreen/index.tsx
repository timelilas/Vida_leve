import { View } from "react-native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { MealButton } from "./components/MealButton";
import { mealButtonsData } from "./utils";
import { useEffect, useState } from "react";
import { MealType } from "../../../@core/entities/@shared/mealType/type";
import { DayPicker } from "../../../components/DayPicker";
import { DateData } from "../../../components/DayPicker/types";
import { RouteConstants } from "../../../routes/types";
import { styles } from "./styles";
import {
  convertDateToDateData,
  formatDateToLabel,
} from "../../../utils/helpers";

const CreateMealScreen = () => {
  const navigation = useAppNavigation();
  const today = convertDateToDateData(new Date());
  const [selectedDate, setSelectedDate] = useState<DateData>(today);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);

  useEffect(() => {
    if (selectedDate && selectedMeal) {
      navigation.navigate(RouteConstants.SearchFoods, {
        mealType: selectedMeal,
        mealDate: {
          year: selectedDate.year,
          month: selectedDate.month,
          day: selectedDate.day,
        },
      });
    }
  }, [selectedDate, selectedMeal, navigation]);

  function goBack() {
    navigation.goBack();
  }

  function handleMealSelection(mealType: MealType) {
    setSelectedMeal(mealType === selectedMeal ? null : mealType);
  }

  function handleDaySelection(dateData: DateData) {
    setSelectedDate(dateData);
  }

  const currentDate = new Date(
    selectedDate.year,
    selectedDate.month,
    selectedDate.day
  );
  const shortDateLabel = formatDateToLabel(currentDate, "short");
  const longDateLAbel = formatDateToLabel(currentDate, "long");

  return (
    <ScreenWrapper>
      <NavigationHeader
        variant="titled"
        title="Registrar Refeição"
        subtitle={shortDateLabel}
        onBack={goBack}
      />
      <ScreenTitle
        title={longDateLAbel}
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

export default CreateMealScreen;
