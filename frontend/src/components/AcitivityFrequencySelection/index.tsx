import { View, ViewStyle, StyleProp } from "react-native";
import { Paragraph } from "../Paragraph/Paragraph";
import { ActivityFrequencyButton } from "./ActivityFrequencyButton";
import { activityFrequencies } from "./utils";
import { ErrorMessage } from "../ErrorMessage";
import { ActitivyFrequency } from "../../@core/entities/@shared/activityFrequency/type";
import { styles } from "./styles";

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
