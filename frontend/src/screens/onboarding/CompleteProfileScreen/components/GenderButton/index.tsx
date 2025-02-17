import { PressableProps, View } from "react-native";
import { ToggleButton } from "../../../../../components/ToggleButton";
import { styles } from "./styles";
import { PropsWithChildren } from "react";

interface GenderButtonProps extends PropsWithChildren {
  selected: boolean;
}

export function GenderButton(props: GenderButtonProps & PressableProps) {
  const { selected, children, ...propsRest } = props;
  return (
    <ToggleButton {...propsRest} selected={selected}>
      <View style={props.disabled && styles.containerDisabled}>{children}</View>
    </ToggleButton>
  );
}
