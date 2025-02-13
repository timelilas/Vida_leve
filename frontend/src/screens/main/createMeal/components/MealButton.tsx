import { ReactNode } from "react";
import { ToggleButton } from "../../../../components/buttons/ToggleButton";
import { PressableProps, StyleSheet, Text, View } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBlock: 14,
    paddingInline: 6,
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
});
