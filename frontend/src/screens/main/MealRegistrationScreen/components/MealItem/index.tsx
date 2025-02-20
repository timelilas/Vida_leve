import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ITEM_HEIGHT_EXPANDED, ITEM_HEIGHT_SHRINKED } from "./constants";
import { ChevronUpIcon } from "../../../../../components/Icons/ChevronUpIcon";
import { IncrementIcon } from "../../../../../components/Icons/IncrementIcon";
import { DecrementIcon } from "../../../../../components/Icons/DecrementIcon";
import { TrashIcon } from "../../../../../components/Icons/TrashIcon";
import { useMealStore } from "../../../../../store/meal";
import { useState } from "react";
import { useAnimation } from "./animation";
import { styles } from "./styles";

interface MealItemProps {
  foodId: string;
}

export function MealItem(props: MealItemProps) {
  const addFood = useMealStore((state) => state.addFood);
  const removeFood = useMealStore((state) => state.removeFood);
  const decrementFoodQuantity = useMealStore(
    (state) => state.decrementFoodQuantity
  );

  const { foodId } = props;
  const food = useMealStore((state) => state.foodMap[foodId]);
  const [isItemExpanded, setIsItemExpanded] = useState(false);

  const totalCalories = food.calories * food.quantity;

  const { animatedValue } = useAnimation({ isItemExpanded });
  const containerHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [ITEM_HEIGHT_SHRINKED, ITEM_HEIGHT_EXPANDED],
  });

  function handleIncrement() {
    addFood(food);
  }

  function hadleDecrement() {
    decrementFoodQuantity(food.id);
  }

  function handleDelete() {
    removeFood(food.id);
  }

  function toggleItemExpansion() {
    setIsItemExpanded((prevState) => !prevState);
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.innerContainer, { height: containerHeight }]}
      >
        <View style={styles.foodDetails}>
          <View style={styles.itemBoxWrapper}>
            <View style={[styles.itemBox, styles.itemHeader]}>
              <ScrollView
                style={styles.textScrollView}
                contentContainerStyle={styles.textScrollContainerStyle}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={styles.text}>{food.name}</Text>
              </ScrollView>
              <Text style={styles.calorieText}>{totalCalories} kcal</Text>
            </View>
            <View style={styles.measurementControl}>
              <View style={[styles.itemBox, styles.counter]}>
                <TouchableOpacity
                  style={food.quantity <= 1 && styles.buttonDisabled}
                  onPress={hadleDecrement}
                  disabled={food.quantity <= 1}
                >
                  <DecrementIcon />
                </TouchableOpacity>
                <Text style={styles.text}>{food.quantity}</Text>
                <TouchableOpacity onPress={handleIncrement}>
                  <IncrementIcon />
                </TouchableOpacity>
              </View>
              <View style={[styles.itemBox, styles.measurementUnit]}>
                <ScrollView
                  style={styles.textScrollView}
                  contentContainerStyle={styles.textScrollContainerStyle}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Text style={styles.text}>{food.measurementUnit}</Text>
                </ScrollView>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={toggleItemExpansion}
            style={styles.toggleItemButton}
          >
            <Animated.View style={isItemExpanded && styles.chvronIconDown}>
              <ChevronUpIcon />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.removeFoodButton}
        >
          <TrashIcon width={18} height={18} />
          <Text style={styles.text}>Excluir</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
