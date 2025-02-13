import { PropsWithChildren } from "react";
import {
  StyleSheet,
  PressableProps,
  Platform,
  Pressable,
  View,
  ColorValue,
} from "react-native";

export interface ToggleButtonProps extends PropsWithChildren {
  selected?: boolean;
  rounded?: boolean;
  backgroundColor?: ColorValue;
}

export function ToggleButton(
  props: ToggleButtonProps & Omit<PressableProps, "style">
) {
  const { selected, rounded, backgroundColor, ...propsRest } = props;

  return (
    <Pressable
      style={[
        styles.button,
        backgroundColor && { backgroundColor },
        selected && styles.buttonSelected,
        rounded && styles.buttonRounded,
      ]}
      {...propsRest}
    >
      <View
        style={[
          styles.container,
          rounded && styles.containerRounded,
          backgroundColor && { backgroundColor },
        ]}
      >
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
});
