import { useRef } from "react";
import { Animated, Text, View } from "react-native";
import { styles, neutralStyles, errorStyles, successStyles } from "./styles";
import { SnackbarProps } from "./types";
import { useSnackbarAnimation } from "./animations";

export function Snackbar(props: SnackbarProps) {
  const { duration, message, variant } = props;
  const snackbarRef = useRef<View | null>(null);
  const { animtedValue } = useSnackbarAnimation({
    snackbarRef,
    duration,
  });

  const variantStyleMap = {
    error: errorStyles,
    success: successStyles,
    neutral: neutralStyles,
  };

  return (
    <Animated.View
      ref={snackbarRef}
      style={[
        styles.container,
        variantStyleMap[variant].container,
        { transform: [{ translateY: animtedValue }] },
      ]}
    >
      <Text style={[styles.message, variantStyleMap[variant].message]}>
        {message}
      </Text>
    </Animated.View>
  );
}
