import { View, Text } from "react-native";
import { ToggleButton } from "../../ToggleButton";
import { styles } from "./styles";

interface ActivityFrequencyButtonProps {
  title: string;
  description: string;
  selected: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export function ActivityFrequencyButton(props: ActivityFrequencyButtonProps) {
  return (
    <ToggleButton
      disabled={props.disabled}
      selected={props.selected}
      onPress={props.onPress}
    >
      <View style={[styles.container, props.disabled && styles.disabled]}>
        <Text style={styles.title}>{props.title}</Text>
        {props.selected && (
          <Text style={[styles.description]}>{props.description}</Text>
        )}
      </View>
    </ToggleButton>
  );
}
