import { StyleSheet, TouchableOpacity } from "react-native";
import { SharpedArrowIcon } from "../icons/SharpedArrowIcon";

interface CalendarSwipeButtonProps {
  direction: "right" | "left";
  onPress?: () => void;
}

export function CalendarSwipeButton(props: CalendarSwipeButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.button}
      activeOpacity={0.7}
    >
      {props.direction === "left" ? <SharpedArrowIcon /> : null}
      {props.direction === "right" ? (
        <SharpedArrowIcon style={styles.iconRight} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconRight: {
    transform: [{ rotate: "180deg" }],
  },
});
