import { useRef } from "react";
import { Text, View } from "react-native";
import Reanimated from "react-native-reanimated";
import { styles, neutralStyles, errorStyles, successStyles, warningStyles } from "./styles";
import { SnackbarProps } from "./types";
import { useSnackbarAnimation } from "./animations";

export function Snackbar(props: SnackbarProps) {
  const { duration, message, variant, isVisible } = props;
  const snackbarRef = useRef<View | null>(null);
  const { styles: animatedStyles } = useSnackbarAnimation({
    snackbarRef,
    duration
  });

  const variantStyleMap = {
    error: errorStyles,
    warning: warningStyles,
    success: successStyles,
    neutral: neutralStyles
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Reanimated.View
      ref={snackbarRef}
      style={[styles.container, variantStyleMap[variant].container, animatedStyles]}>
      <Text style={[styles.message, variantStyleMap[variant].message]}>{message}</Text>
    </Reanimated.View>
  );
}
