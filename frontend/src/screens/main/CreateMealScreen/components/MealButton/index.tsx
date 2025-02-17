import { ReactNode } from "react";
import { ToggleButton } from "../../../../../components/ToggleButton";
import { PressableProps, Text, View } from "react-native";
import { styles } from "./styles";

interface MealButtonProps {
  title: string;
  icon: ReactNode;
  selected: boolean;
}

export function MealButton(props: MealButtonProps & PressableProps) {
  const { icon, title, selected, ...propsRest } = props;

  return (
    <ToggleButton selected={selected} {...propsRest}>
      <View style={styles.container}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
    </ToggleButton>
  );
}
