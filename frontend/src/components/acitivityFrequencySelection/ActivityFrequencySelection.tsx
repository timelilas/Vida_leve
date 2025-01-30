import { View, ViewStyle, StyleProp, StyleSheet } from "react-native";
import { Paragraph } from "../Paragraph";
import { ActivityFrequencyButton } from "./ActivityFrequencyButton";
import { activityFrequencies } from "./utils";
import { ErrorMessage } from "../ErrorMessage";
import { ActitivyFrequency } from "../../@core/entities/@shared/activityFrequency/type";

interface ActivityFrequencySelectionProps {
  errorMessage?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  selectedFrequency: ActitivyFrequency | null;
  onSelect: (frequency: ActitivyFrequency) => void;
}

export function ActivityFrequencySelection(
  props: ActivityFrequencySelectionProps
) {
  const { errorMessage, selectedFrequency, style, disabled, onSelect } = props;
  return (
    <View style={[styles.container, style]}>
      <Paragraph style={styles.label}>
        Qual é o seu nível de atividade física diária?
      </Paragraph>
      {activityFrequencies.map(({ type, title, description }) => (
        <ActivityFrequencyButton
          key={type}
          disabled={disabled}
          selected={selectedFrequency === type}
          onPress={() => onSelect(type)}
          title={title}
          description={description}
        />
      ))}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    lineHeight: 16,
  },
  submitButton: {
    marginTop: "auto",
  },
});
