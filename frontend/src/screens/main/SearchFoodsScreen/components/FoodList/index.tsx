import { View } from "react-native";
import { styles } from "./styles";
import { FoodItem } from "../FoodItem";
import { FoodProps } from "../../../../../@core/entities/food/type";
import { memo } from "react";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { useMealStore } from "../../../../../store/meal";

interface FoodListProps {
  foods: FoodProps[];
}

export const FoodList = memo(({ foods }: FoodListProps) => {
  const navigation = useAppNavigation();
  const { addFood } = useMealStore((state) => state.actions);

  function handleFoodSelection(food: FoodProps) {
    addFood(food);
    navigation.navigate(RouteConstants.MealRegistration);
  }

  return (
    <View style={styles.foodList}>
      {foods.map((food) => (
        <FoodItem
          key={food.id}
          action={() => handleFoodSelection(food)}
          name={food.name}
        />
      ))}
    </View>
  );
});
