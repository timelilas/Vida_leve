import { View, Text, StyleSheet } from "react-native";
import { ToggleButton } from "../../../../components/buttons/ToggleButton";

interface FrequencyButtonProps {
  title: string;
  description: string;
  selected: boolean;
  onPress?: () => void;
}

export function FrequencyButton(props: FrequencyButtonProps) {
  return (
    <ToggleButton selected={props.selected} onPress={props.onPress}>
      <View
        style={[styles.container, props.selected && styles.containerExpanded]}
      >
        <Text style={styles.title}>{props.title}</Text>
        <Text
          style={[
            styles.description,
            !props.selected && styles.descriptionHidden,
          ]}
        >
          {props.description}
        </Text>
      </View>
    </ToggleButton>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  containerExpanded: {
    paddingVertical: 6,
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
    color: "#242424",
  },
  descriptionHidden: {
    overflow: "hidden",
    maxHeight: 0,
  },
});
