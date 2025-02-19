import { View } from "react-native";
import { styles } from "./styles";
import { FoodItem } from "../FoodItem";
import { FoodProps } from "../../../../../@core/entities/food/type";
import { memo } from "react";
import { useAppNavigation } from "../../../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";

interface FoodListProps {
  foods: FoodProps[];
}

export const FoodList = memo(({ foods }: FoodListProps) => {
  const navigation = useAppNavigation();

  function navigateToMealRegistration() {
    navigation.navigate(RouteConstants.MealRegistration);
  }

  return (
    <View style={styles.foodList}>
      {foods.map((food) => (
        <FoodItem
          key={food.id}
          action={navigateToMealRegistration}
          name={food.name}
        />
      ))}
    </View>
  );
});
