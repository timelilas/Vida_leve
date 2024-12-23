import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { ToggleButton, ToggleButtonProps } from "./ToggleButton";
import { ReactNode } from "react";

interface CaloriePlanButtonProps extends Omit<ToggleButtonProps, "children"> {
  title: string;
  icon: ReactNode;
  duration: number;
  dailyCalories: number;
}

export function CaloriePlanButton(props: CaloriePlanButtonProps) {
  const styles = useStyles();

  return (
    <ToggleButton
      disabled={props.disabled}
      onPress={props.onPress}
      selected={props.selected}
    >
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          {props.icon}
          <View>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
        <View>
          <View style={styles.goal}>
            <Text style={styles.dailyCalories}>
              {props.dailyCalories} kcal/dia
            </Text>
            <Text style={styles.duration}>por {props.duration} semanas</Text>
          </View>
        </View>
      </View>
    </ToggleButton>
  );
}

function useStyles() {
  const screen = useWindowDimensions();

  return StyleSheet.create({
    contentContainer: {
      flexDirection: screen.width >= 390 ? "row" : "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: screen.width >= 390 ? 0 : 8,
      paddingVertical: 14,
      paddingHorizontal: 6,
    },
    titleContainer: {
      flexDirection: screen.width >= 240 ? "row" : "column",
      alignItems: "center",
      gap: 6,
    },
    title: {
      width: "100%",
      fontSize: 16,
      lineHeight: 16,
      fontFamily: "Roboto-400",
      color: "#242424",
      textAlign: "center",
    },
    goal: {
      alignItems: screen.width >= 390 ? "flex-end" : "center",
    },
    dailyCalories: {
      fontSize: 24,
      color: "#242424",
      fontFamily: "Roboto-700",
      textAlign: "center",
    },
    duration: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily: "Roboto-300",
      color: "#242424",
      textAlign: "center",
    },
  });
}
