import { View } from "react-native";
import { styles } from "./styles";
import { FoodItem } from "../FoodItem";
import { FoodProps } from "../../../../../@core/entities/food/type";
import { memo } from "react";

interface FoodListProps {
  foods: FoodProps[];
}

export const FoodList = memo(({ foods }: FoodListProps) => {
  return (
    <View style={styles.foodList}>
      {foods.map((food) => (
        <FoodItem key={food.id} action={() => {}} name={food.name} />
      ))}
    </View>
  );
});
