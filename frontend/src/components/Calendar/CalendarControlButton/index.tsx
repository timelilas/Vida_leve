import { Text, TouchableOpacity } from "react-native";
import { SolidArrowIcon } from "../../Icons/SolidArrow";
import { styles } from "./styles";

interface CalendarControlButtonProps {
  onPress: () => void;
  label: string;
}

export function CalendarControlButton(props: CalendarControlButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      style={styles.button}
    >
      <Text style={styles.label}>{props.label}</Text>
      <SolidArrowIcon />
    </TouchableOpacity>
  );
}
