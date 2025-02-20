import { View } from "react-native";
import { styles } from "./styles";
import { FoodItem } from "../FoodItem";
import { FoodProps } from "../../../../../@core/entities/food/type";
import { memo, useContext } from "react";
import { useAppNavigation } from "../../../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { MealRegistrationContext } from "../../../../../contexts/mealRegistration/context";
import { useMealStore } from "../../../../../store/meal";

interface FoodListProps {
  foods: FoodProps[];
}

export const FoodList = memo(({ foods }: FoodListProps) => {
  const navigation = useAppNavigation();
  const addFood = useMealStore((state) => state.addFood);

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
