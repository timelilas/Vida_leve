import { ReactNode } from "react";
import { ToggleButton } from "../../../../../components/ToggleButton";
import { PressableProps, Text, View } from "react-native";
import { styles } from "./styles";
import { Skeleton } from "moti/skeleton";

interface MealButtonProps {
  title: string;
  icon: ReactNode;
  selected: boolean;
  caloriesConsumed: number;
  isLoading?: boolean;
}

export function MealButton(props: MealButtonProps & PressableProps) {
  const { icon, title, selected, caloriesConsumed, disabled, isLoading, ...propsRest } = props;

  return (
    <Skeleton
      colorMode="light"
      height={66}
      radius={8}
      width="100%"
      transition={{ type: "timing" }}
      disableExitAnimation
      show={isLoading}>
      <ToggleButton selected={selected} disabled={disabled || isLoading} {...propsRest}>
        <View style={[styles.container, disabled && styles.containerDisabled]}>
          {icon}
          <Text style={styles.title}>{title}</Text>
          {caloriesConsumed ? (
            <Text style={styles.caloriesText}>{caloriesConsumed} Kcal</Text>
          ) : null}
        </View>
      </ToggleButton>
    </Skeleton>
  );
}
