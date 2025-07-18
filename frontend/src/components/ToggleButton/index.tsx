import { PropsWithChildren } from "react";
import { styles } from "./styles";
import { PressableProps, Pressable, View, ColorValue } from "react-native";

export interface ToggleButtonProps extends PropsWithChildren {
  selected?: boolean;
  rounded?: boolean;
  backgroundColor?: ColorValue;
}

export function ToggleButton(props: ToggleButtonProps & Omit<PressableProps, "style">) {
  const { selected, rounded, backgroundColor, children, disabled, ...propsRest } = props;

  return (
    <Pressable
      style={[
        styles.button,
        backgroundColor && { backgroundColor },
        selected && styles.buttonSelected,
        rounded && styles.buttonRounded,
        disabled && styles.buttonDisabled,
        disabled && selected && styles.buttonSelectedDisabled
      ]}
      disabled={disabled}
      {...propsRest}>
      <View
        style={[
          styles.container,
          rounded && styles.containerRounded,
          backgroundColor && { backgroundColor }
        ]}>
        {children}
      </View>
    </Pressable>
  );
}
