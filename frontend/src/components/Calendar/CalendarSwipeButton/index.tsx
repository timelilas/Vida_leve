import { TouchableOpacity } from "react-native";
import { SharpedArrowIcon } from "../../Icons/SharpedArrowIcon";
import { styles } from "./styles";

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
