import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SolidArrowIcon } from "../icons/SolidArrow";

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

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: "Roboto-500",
    color: "#49454F",
  },
});
