import { View, Text, TouchableOpacity } from "react-native";
import { FoodProps } from "../../../../../@core/entities/food/type";
import { ArrowUpLeftIcon } from "../../../../../components/Icons/ArrowUpLeftIcon";
import { styles } from "./styles";

interface FoodItemProps extends Pick<FoodProps, "name"> {
  action: () => void;
}

export function FoodItem(props: FoodItemProps) {
  const { name, action } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={action}
      style={styles.container}
    >
      <Text style={styles.text}>{name}</Text>
      <ArrowUpLeftIcon />
    </TouchableOpacity>
  );
}
