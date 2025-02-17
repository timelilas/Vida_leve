import { Text, ViewStyle } from "react-native";
import { StyleProp, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface CalendarFooterButtonProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function CalendarFooterButton(props: CalendarFooterButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      style={[styles.button, props.style]}
    >
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
}
