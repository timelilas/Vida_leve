import { Text, View } from "react-native";
import { SubmitButton } from "../../../../../components/SubmitButton";
import { styles } from "./styles";
import { PlusIcon } from "../../../../../components/Icons/PlusIcon";
import { useMealStore } from "../../../../../store/meal";
import { calculateMealCalories } from "../../../../../@core/entities/meal/helpers";
import { RouteConstants } from "../../../../../routes/types";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { CreateMealParams } from "../../../../../hooks/meal/types";

interface MealSummaryProps {
  isSubmitting: boolean;
  onError: (error: Error) => void;
  onSubmit: (data: CreateMealParams) => Promise<void>;
}

export function MealSummary(props: MealSummaryProps) {
  const navigation = useAppNavigation();
  const foodMap = useMealStore((state) => state.foodMap);
  const mealDate = useMealStore((state) => state.date);
  const mealType = useMealStore((state) => state.type);

  const totalCalories = calculateMealCalories(Object.values(foodMap));

  async function handleMealRegistration() {
    if (totalCalories <= 0 || !mealType) return;

    const foods = Object.values(foodMap).map(({ id, quantity }) => ({
      foodId: id,
      quantity,
    }));

    try {
      await props.onSubmit({ date: mealDate, mealType, foods });
    } catch (error: any) {
      props.onError(error);
    }
  }

  function navigateToSearchFood() {
    navigation.navigate(RouteConstants.SearchFoods, { foodName: "" });
  }

  return (
    <View style={styles.container}>
      <SubmitButton
        type="highlighted"
        disabled={props.isSubmitting}
        onPress={navigateToSearchFood}
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
        disabled={totalCalories <= 0 || props.isSubmitting}
        onPress={handleMealRegistration}
      />
    </View>
  );
}
