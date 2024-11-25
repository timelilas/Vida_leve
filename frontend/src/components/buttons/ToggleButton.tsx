import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import { Platform } from "react-native";

export interface ToggleButtonProps extends PropsWithChildren {
  selected: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <Pressable
      disabled={props.disabled}
      onPress={props.onPress}
      style={[
        styles.button,
        props.style,
        props.selected && styles.buttonSelected,
        props.disabled && styles.disabled,
      ]}
    >
      <View style={styles.container}>{props.children}</View>
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
  buttonSelected: {
    backgroundColor: "#ffae31",
    borderRadius: 10,
    ...(Platform.OS === "android"
      ? {
          borderColor: "#ffae31",
          shadowColor: "#000000",
          elevation: 6,
        }
      : {
          borderColor: "#ffae31",
          shadowColor: "#00000040",
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
        }),
  },
  container: {
    backgroundColor: "#f7f7fc",
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
