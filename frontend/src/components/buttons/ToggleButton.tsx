import { PropsWithChildren } from "react";
import {
  StyleSheet,
  PressableProps,
  Platform,
  Pressable,
  View,
} from "react-native";

export interface ToggleButtonProps extends PropsWithChildren {
  selected?: boolean;
  rounded?: boolean;
}

export function ToggleButton(props: ToggleButtonProps & PressableProps) {
  const { selected, rounded, ...propsRest } = props;

  return (
    <Pressable
      style={[
        styles.button,
        selected && styles.buttonSelected,
        props.disabled && styles.disabled,
        rounded && styles.buttonRounded,
      ]}
      {...propsRest}
    >
      <View style={[styles.container, rounded && styles.containerRounded, ,]}>
        {props.children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4e4b66",
    backgroundColor: "#f7f7fc",
  },
  buttonRounded: {
    borderRadius: 18,
  },
  buttonSelected: {
    backgroundColor: "#ffae31",
    borderColor: "#ffae31",
    borderRadius: 10,
    shadowColor: "#000000",
    ...(Platform.OS === "android"
      ? {
          elevation: 4,
        }
      : {
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
          shadowOpacity: 0.25,
        }),
  },
  container: {
    backgroundColor: "#f7f7fc",
    borderRadius: 8,
  },
  containerRounded: {
    borderRadius: 16,
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: "#f7f7fc",
  },
});
