import { View, Text, StyleSheet } from "react-native";
import { ToggleButton } from "../../../../components/buttons/ToggleButton";

interface FrequencyButtonProps {
  title: string;
  description: string;
  selected: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export function FrequencyButton(props: FrequencyButtonProps) {
  return (
    <ToggleButton
      disabled={props.disabled}
      selected={props.selected}
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        {props.selected && (
          <Text style={[styles.description]}>{props.description}</Text>
        )}
      </View>
    </ToggleButton>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto-300",
    color: "#4E4B66",
  },
  descriptionHidden: {
    overflow: "hidden",
    maxHeight: 0,
  },
});
