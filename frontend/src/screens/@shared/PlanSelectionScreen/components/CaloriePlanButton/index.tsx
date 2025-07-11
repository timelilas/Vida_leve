import { Text, View, PressableProps } from "react-native";
import { ToggleButton } from "../../../../../components/ToggleButton";
import { ReactNode } from "react";
import { useStyles } from "./styles";

interface CaloriePlanButtonProps {
  title: string;
  icon: ReactNode;
  duration: number;
  selected: boolean;
  dailyCalories: number;
}

export function CaloriePlanButton(props: CaloriePlanButtonProps & PressableProps) {
  const styles = useStyles();

  return (
    <ToggleButton disabled={props.disabled} onPress={props.onPress} selected={props.selected}>
      <View style={[styles.contentContainer, props.disabled && styles.disabled]}>
        <View style={styles.titleContainer}>
          {props.icon}
          <View>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
        <View>
          <View style={styles.goal}>
            <Text style={styles.dailyCalories}>{props.dailyCalories} kcal/dia</Text>
            <Text style={styles.duration}>por {props.duration} semanas</Text>
          </View>
        </View>
      </View>
    </ToggleButton>
  );
}
