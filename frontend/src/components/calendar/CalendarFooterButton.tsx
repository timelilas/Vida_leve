import { Text, ViewStyle } from "react-native";
import { StyleProp, StyleSheet, TouchableOpacity } from "react-native";

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

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: "Roboto-500",
    fontSize: 14,
    color: "#242424",
  },
});
