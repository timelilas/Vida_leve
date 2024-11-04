import { Text, View } from "react-native";
import { ToggleButton, ToggleButtonProps } from "../ToggleButton";
import { useGoalButtonStyles } from "./styles";
import { LightningIcon } from "../../icons/LightningIcon";

export function AcceleratedGoalButton(
  props: Omit<ToggleButtonProps, "children">
) {
  const goalButtonStyles = useGoalButtonStyles();

  return (
    <ToggleButton onPress={props.onPress} selected={props.selected}>
      <View style={goalButtonStyles.contentContainer}>
        <View style={goalButtonStyles.titleContainer}>
          <LightningIcon />
          <View>
            <Text style={goalButtonStyles.subtitle}>Progresso Acelerado</Text>
          </View>
        </View>
        <View>
          <View style={goalButtonStyles.weekGoal}>
            <Text style={goalButtonStyles.weekTarget}>1360 kcal/dia</Text>
            <Text style={goalButtonStyles.weekPeriod}>por 7 semanas</Text>
          </View>
        </View>
      </View>
    </ToggleButton>
  );
}
