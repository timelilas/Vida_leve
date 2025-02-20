import { Text, View } from "react-native";
import { SubmitButton } from "../../../../../components/SubmitButton";
import { styles } from "./styles";
import { PlusIcon } from "../../../../../components/Icons/PlusIcon";
import { useMealStore } from "../../../../../store/meal";
import { calculateMealCalories } from "../../../../../@core/entities/meal/helpers";
import { RouteConstants } from "../../../../../routes/types";
import { useAppNavigation } from "../../../../../hooks/useAppNavigation";

export function MealSummary() {
  const navigation = useAppNavigation();
  const foodMap = useMealStore((state) => state.foodMap);

  const totalCalories = calculateMealCalories(Object.values(foodMap));

  function handleMealRegistration() {
    if (totalCalories <= 0) return;
  }

  function handleFoodAddition() {
    navigation.navigate(RouteConstants.SearchFoods);
  }

  return (
    <View style={styles.container}>
      <SubmitButton
        type="highlighted"
        onPress={handleFoodAddition}
        title={
          <View style={styles.addFoodButtonContainer}>
            <PlusIcon />
            <Text style={styles.addFoodButtonText}>Adicionar alimento</Text>
          </View>
        }
      />
      <View style={styles.addFoodTextWrapper}>
        <Text style={styles.mealCalorieText}>
          A sua refeição até agora está em
        </Text>
        <Text style={styles.mealCalorieTextBold}>{totalCalories}</Text>
        <Text style={styles.mealCalorieText}>kcal</Text>
      </View>
      <SubmitButton
        type="primary"
        title="Registrar refeição"
        disabled={totalCalories <= 0}
        onPress={handleMealRegistration}
      />
    </View>
  );
}
