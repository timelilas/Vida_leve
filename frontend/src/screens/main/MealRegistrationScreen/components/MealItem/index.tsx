import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ITEM_HEIGHT_EXPANDED, ITEM_HEIGHT_SHRINKED } from "./constants";
import { ChevronUpIcon } from "../../../../../components/Icons/ChevronUpIcon";
import { IncrementIcon } from "../../../../../components/Icons/IncrementIcon";
import { DecrementIcon } from "../../../../../components/Icons/DecrementIcon";
import { TrashIcon } from "../../../../../components/Icons/TrashIcon";
import { useMealStore } from "../../../../../store/meal";
import { useExpansionAnimation } from "./animations";
import { styles } from "./styles";

import Reanimated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

interface MealItemProps {
  foodId: string;
  disabled?: boolean;
}

export function MealItem(props: MealItemProps) {
  const mealActions = useMealStore((state) => state.actions);
  const food = useMealStore((state) => state.foodMap[props.foodId]);
  const { value } = useExpansionAnimation({ isItemExpanded: food.isExpanded });

  const animatedStyle = useAnimatedStyle(() => ({
    height: interpolate(value.value, [0, 1], [ITEM_HEIGHT_SHRINKED, ITEM_HEIGHT_EXPANDED])
  }));

  function handleIncrement() {
    if (props.disabled) return;
    mealActions.incrementFoodQuantity(food.id);
  }

  function hadleDecrement() {
    if (props.disabled) return;
    mealActions.decrementFoodQuantity(food.id);
  }

  function handleDelete() {
    if (props.disabled) return;
    mealActions.removeFood(food.id);
  }

  function toggleItemExpansion() {
    if (props.disabled) return;
    mealActions.toggleItemExpansion(food.id);
  }

  return (
    <View style={styles.container}>
      <Reanimated.View style={[styles.innerContainer, animatedStyle]}>
        <View style={[styles.foodDetails, props.disabled ? styles.containerDisabled : null]}>
          <View style={styles.itemBoxWrapper}>
            <View style={[styles.itemBox, styles.itemHeader]}>
              <ScrollView
                style={styles.textScrollView}
                contentContainerStyle={styles.textScrollContainerStyle}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Text style={styles.text}>{food.name}</Text>
              </ScrollView>
              <Text style={styles.calorieText}>{food.calories} kcal</Text>
            </View>
            <View style={styles.measurementControl}>
              <View style={[styles.itemBox, styles.counter]}>
                <TouchableOpacity
                  style={food.quantity <= 1 && styles.buttonDisabled}
                  onPress={hadleDecrement}
                  disabled={food.quantity <= 1 || props.disabled}>
                  <DecrementIcon />
                </TouchableOpacity>
                <Text style={styles.text}>{food.quantity}</Text>
                <TouchableOpacity onPress={handleIncrement} disabled={props.disabled}>
                  <IncrementIcon />
                </TouchableOpacity>
              </View>
              <View style={[styles.itemBox, styles.measurementUnit]}>
                <ScrollView
                  style={styles.textScrollView}
                  contentContainerStyle={styles.textScrollContainerStyle}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <Text style={styles.text}>{food.measurementUnit}</Text>
                </ScrollView>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={toggleItemExpansion}
            disabled={props.disabled}
            style={styles.toggleItemButton}>
            <ChevronUpIcon style={!food.isExpanded && styles.chvronIconDown} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleDelete}
          disabled={props.disabled}
          style={styles.removeFoodButton}>
          <TrashIcon width={18} height={18} />
          <Text style={styles.text}>Excluir</Text>
        </TouchableOpacity>
      </Reanimated.View>
    </View>
  );
}
