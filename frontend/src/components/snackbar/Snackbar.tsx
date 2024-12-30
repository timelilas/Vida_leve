import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { styles, neutralStyles, errorStyles, successStyles } from "./styles";

export type SnackbarVariant = "success" | "error" | "neutral";

interface SnackbarProps {
  message: string;
  duration: number;
  variant: SnackbarVariant;
}

export function Snackbar(props: SnackbarProps) {
  const { duration, message, variant } = props;
  const snackbarRef = useRef<View | null>(null);
  const snackbarHeight = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [translateY, setTranslateY] = useState(new Animated.Value(0));
  const baseAnimatedProps = { useNativeDriver: true, bounciness: 3, speed: 14 };

  const variantStyleMap = {
    error: errorStyles,
    success: successStyles,
    neutral: neutralStyles,
  };

  useEffect(() => {
    const timerRef = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timerRef);
  }, []);

  useLayoutEffect(() => {
    snackbarRef.current?.measure((...rects) => {
      snackbarHeight.current = rects[3];
      setTranslateY(new Animated.Value(rects[3]));
    });
  }, []);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        ...baseAnimatedProps,
        toValue: 0,
      }).start();
    } else {
      Animated.spring(translateY, {
        ...baseAnimatedProps,
        toValue: snackbarHeight.current,
      }).start();
    }
  }, [translateY, isVisible]);

  return (
    <Animated.View
      ref={snackbarRef}
      style={[
        styles.container,
        variantStyleMap[variant].container,
        { transform: [{ translateY }] },
      ]}
    >
      <Text style={[styles.message, variantStyleMap[variant].message]}>
        {message}
      </Text>
    </Animated.View>
  );
}
