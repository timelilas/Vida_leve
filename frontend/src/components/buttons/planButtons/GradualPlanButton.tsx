import { Text, View } from "react-native";
import { ToggleButton, ToggleButtonProps } from "../ToggleButton";
import { useGoalButtonStyles } from "./styles";
import { LeafIcon } from "../../icons/LeafIcon";

export function GradualPlanButton(props: Omit<ToggleButtonProps, "children">) {
  const goalButtonStyles = useGoalButtonStyles();

  return (
    <ToggleButton onPress={props.onPress} selected={props.selected}>
      <View style={goalButtonStyles.contentContainer}>
        <View style={goalButtonStyles.titleContainer}>
          <LeafIcon />
          <View>
            <Text style={goalButtonStyles.subtitle}>Progresso Gradual</Text>
          </View>
        </View>
        <View>
          <View style={goalButtonStyles.weekGoal}>
            <Text style={goalButtonStyles.weekTarget}>1800 kcal</Text>
            <Text style={goalButtonStyles.weekPeriod}>por 15 semanas</Text>
          </View>
        </View>
      </View>
    </ToggleButton>
  );
}
