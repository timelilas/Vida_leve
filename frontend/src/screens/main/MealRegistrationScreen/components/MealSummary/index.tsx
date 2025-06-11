import { StyleProp, Text, View, ViewStyle } from "react-native";
import { SubmitButton } from "../../../../../components/SubmitButton";
import { styles } from "./styles";
import { PlusIcon } from "../../../../../components/Icons/PlusIcon";
import { useMealStore } from "../../../../../store/meal";
import { calculateMealCalories } from "../../../../../@core/entities/meal/helpers";
import { RouteConstants } from "../../../../../routes/types";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { MealType } from "../../../../../@core/entities/@shared/mealType/type";

export interface MealRegistrationData {
  id?: number;
  date: Date;
  mealType: MealType;
  foods: { foodId: number; quantity: number }[];
}

interface MealSummaryProps {
  isSubmitting: boolean;
  isSubmitted: boolean;
  onError: (error: Error) => void;
  onSubmit: (data: MealRegistrationData) => Promise<void>;
  style?: StyleProp<ViewStyle>;
}

export function MealSummary(props: MealSummaryProps) {
  const navigation = useAppNavigation();
  const {
    foodMap,
    foodIds,
    date: mealDate,
    type: mealType,
    id: mealId
  } = useMealStore((state) => state);

  const existigFoods = foodIds.length;
  const totalCalories = calculateMealCalories(Object.values(foodMap));

  async function handleMealRegistration() {
    if (!existigFoods || !mealType || props.isSubmitting) return;

    const foods = foodIds.map((id) => ({
      foodId: foodMap[`${id}`].id,
      quantity: foodMap[`${id}`].quantity
    }));

    try {
      await props.onSubmit({
        id: mealId,
        date: new Date(mealDate),
        mealType,
        foods
      });
    } catch (error: any) {
      props.onError(error);
    }
  }

  function navigateToSearchFood() {
    navigation.navigate(RouteConstants.SearchFoods, { foodName: "" });
  }

  return (
    <View style={[styles.container, props.style]}>
      <SubmitButton
        type="highlighted"
        disabled={props.isSubmitting || props.isSubmitted}
        onPress={navigateToSearchFood}
        title={
          <View style={styles.addFoodButtonContainer}>
            <PlusIcon />
            <Text style={styles.addFoodButtonText}>Adicionar alimento</Text>
          </View>
        }
      />
      <View style={styles.addFoodTextWrapper}>
        <Text style={styles.mealCalorieText}>A sua refeição até agora está em</Text>
        <Text style={styles.mealCalorieTextBold}>{totalCalories}</Text>
        <Text style={styles.mealCalorieText}>kcal</Text>
      </View>
      <SubmitButton
        type="primary"
        title="Registrar refeição"
        disabled={!existigFoods || !mealType || props.isSubmitting || props.isSubmitted}
        onPress={handleMealRegistration}
      />
    </View>
  );
}
