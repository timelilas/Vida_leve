import { Text, View } from "react-native";
import { ToggleButton, ToggleButtonProps } from "../ToggleButton";
import { useGoalButtonStyles } from "./styles";
import { WindIcon } from "../../icons/WindIcon";

export function ModeratedPlanButton(
  props: Omit<ToggleButtonProps, "children">
) {
  const goalButtonStyles = useGoalButtonStyles();

  return (
    <ToggleButton onPress={props.onPress} selected={props.selected}>
      <View style={goalButtonStyles.contentContainer}>
        <View style={goalButtonStyles.titleContainer}>
          <WindIcon />
          <View>
            <Text style={goalButtonStyles.subtitle}>Progresso Moderado</Text>
          </View>
        </View>
        <View>
          <View style={goalButtonStyles.weekGoal}>
            <Text style={goalButtonStyles.weekTarget}>2000 kcal/dia</Text>
            <Text style={goalButtonStyles.weekPeriod}>por 11 semanas</Text>
          </View>
        </View>
      </View>
    </ToggleButton>
  );
}
