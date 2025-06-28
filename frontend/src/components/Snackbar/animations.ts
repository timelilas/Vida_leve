import { useState, useEffect, useRef, useLayoutEffect, MutableRefObject } from "react";
import { View } from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

interface SnackbarAnimationParams {
  snackbarRef: MutableRefObject<View | null>;
  duration: number;
}

export function useSnackbarAnimation(params: SnackbarAnimationParams) {
  const { duration, snackbarRef } = params;
  const [isVisible, setIsVisible] = useState(true);
  const snackbarHeight = useRef(0);
  const opacityAnimatedValue = useSharedValue(0);
  const translateAnimatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacityAnimatedValue.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(
          translateAnimatedValue.value,
          [0, 1],
          [snackbarHeight.current, 0]
        )
      }
    ]
  }));

  useEffect(() => {
    const opacityProps = { duration: 0 };
    const springProps = { duration: 375, dampingRatio: 0.78 };

    if (isVisible) {
      opacityAnimatedValue.value = withTiming(1, opacityProps, () => {
        translateAnimatedValue.value = withSpring(1, springProps);
      });
    } else {
      translateAnimatedValue.value = withSpring(0, springProps, () => {
        opacityAnimatedValue.value = withTiming(0, opacityProps);
      });
    }
  }, [isVisible, opacityAnimatedValue, translateAnimatedValue]);

  useLayoutEffect(() => {
    snackbarRef.current?.measure((...rects) => {
      snackbarHeight.current = rects[3];
    });
  }, [snackbarRef]);

  useEffect(() => {
    const timerRef = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timerRef);
  }, [duration]);

  return {
    styles: animatedStyle
  };
}
