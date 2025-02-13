import { View, Text, TouchableOpacity } from "react-native";
import { FoodProps } from "../../../../@core/entities/food/type";
import { ArrowUpLeftIcon } from "../../../../components/icons/ArrowUpLeftIcon";
import { StyleSheet } from "react-native";

interface FoodItemProps extends Pick<FoodProps, "name"> {
  action: () => void;
}

export const FOOD_ITEM_HEIGHT = 50;

export function FoodItem(props: FoodItemProps) {
  const { name, action } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <TouchableOpacity hitSlop={2} onPress={action}>
        <ArrowUpLeftIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: FOOD_ITEM_HEIGHT,
    borderBottomColor: "#B7B7B7",
    borderBottomWidth: 1,
  },
  text: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 16,
    color: "#242424",
    fontFamily: "Roboto-400",
  },
});
